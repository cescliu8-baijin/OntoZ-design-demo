"""Benchmark evidence, URL boundaries and HTTP persistence regressions."""
import http.client
import importlib.util
import json
from pathlib import Path
import socket
import sqlite3
import sys
import tempfile
import threading
import unittest
from unittest.mock import patch, MagicMock
sys.dont_write_bytecode = True
import lucas_benchmark as benchmark

class BenchmarkTests(unittest.TestCase):
    def test_evidence_uses_html_not_script_text(self):
        result = benchmark.inspect('''<title>A &amp; B</title><meta name="DESCRIPTION" content="Products"><h1>Precision <em>parts</em></h1><h2>Capabilities</h2><script>ignore this text</script><script type="application/ld+json">{"@graph":[{"@type":"Organization"},{"@type":["Product","Thing"]}]}</script>''')
        self.assertEqual(result['title'], 'A & B')
        self.assertEqual(result['h1'], ['Precision parts'])
        self.assertEqual(result['description'], 'Products')
        self.assertEqual(result['headings'], 1)
        self.assertEqual(result['schemas'], ['Organization', 'Product', 'Thing'])
        self.assertEqual(benchmark.inspect('<script type="application/ld+json">broken</script>')['schemas'], [])
        self.assertEqual(benchmark.inspect('<meta name><link rel><h1> </h1>')['h1'], [])

    def test_public_url_validation(self):
        self.assertEqual(benchmark.public_url('example.com/products#details'), 'https://example.com/products')
        for url in ['file:///etc/passwd', 'http://user:password@example.com', 'https://example.com:22', 'https://example.com\n/test', '']:
            with self.subTest(url=url), self.assertRaises(ValueError): benchmark.public_url(url)

    def test_private_and_mixed_dns_addresses_never_connect(self):
        for addresses in [['127.0.0.1'], ['10.0.0.1'], ['169.254.169.254'], ['93.184.216.34','192.168.1.1']]:
            records=[(socket.AF_INET,socket.SOCK_STREAM,6,'',(ip,443)) for ip in addresses]
            with patch.object(benchmark.socket,'getaddrinfo',return_value=records), patch.object(benchmark.socket,'socket') as connect:
                with self.assertRaises(ValueError): benchmark.fetch_html('https://example.com')
                connect.assert_not_called()

    def test_redirect_target_is_revalidated(self):
        response=MagicMock(status=302)
        response.getheader.return_value='http://127.0.0.1/private'
        conn=MagicMock();conn.getresponse.return_value=response
        public=[(socket.AF_INET,socket.SOCK_STREAM,6,'',('93.184.216.34',80))]
        private=[(socket.AF_INET,socket.SOCK_STREAM,6,'',('127.0.0.1',80))]
        with patch.object(benchmark.socket,'getaddrinfo',side_effect=[public,private]), patch.object(benchmark.socket,'socket'), patch.object(benchmark.http.client,'HTTPConnection',return_value=conn):
            with self.assertRaises(ValueError): benchmark.fetch_html('http://example.com')
            self.assertEqual(conn.request.call_count,1)

    def test_report_compares_both_inputs(self):
        with patch.object(benchmark,'fetch_html',return_value=('https://example.com/','<title>Competitor</title><h1>Parts</h1>')):
            report=benchmark.analyze('example.com','<title>Ours</title><h1>Robots</h1>','已发布 v1')
        self.assertEqual(report['competitor']['title'],'Competitor')
        self.assertEqual(report['own']['h1'],['Robots'])
        self.assertEqual(report['ownLabel'],'已发布 v1')

    def test_endpoint_persists_report_and_preserves_site(self):
        spec=importlib.util.spec_from_file_location('lucas_benchmark_server',Path(__file__).with_name('lucas-demo-server.py'))
        server=importlib.util.module_from_spec(spec);spec.loader.exec_module(server)
        with tempfile.TemporaryDirectory() as folder:
            server.DB=Path(folder)/'state.sqlite3'
            with sqlite3.connect(server.DB) as db:db.execute('CREATE TABLE state (id INTEGER PRIMARY KEY, body TEXT NOT NULL)')
            state=server.initial();state['published']={'version':7};server.write(state)
            httpd=server.ThreadingHTTPServer(('127.0.0.1',0),server.Handler)
            thread=threading.Thread(target=httpd.serve_forever,daemon=True);thread.start()
            client=http.client.HTTPConnection(*httpd.server_address)
            try:
                with patch.object(benchmark,'fetch_html',return_value=('https://example.com/','<title>Public</title>')):
                    client.request('POST','/api/lucas/benchmark',json.dumps({'url':'example.com','ownHtml':'<title>Own</title>','ownLabel':'草稿'}),{'Content-Type':'application/json'})
                    response=client.getresponse();report=json.loads(response.read());self.assertEqual(response.status,200)
                saved=server.read();self.assertEqual(saved['competitorAnalysis'],report)
                self.assertEqual(saved['published'],{'version':7});self.assertEqual(saved['revision'],0)
                with patch.object(server,'analyze',side_effect=ValueError('无法读取')):
                    client.request('POST','/api/lucas/benchmark','{}',{'Content-Type':'application/json'})
                    response=client.getresponse();response.read();self.assertEqual(response.status,400)
                self.assertEqual(server.read()['competitorAnalysis'],report)
            finally:
                client.close();httpd.shutdown();httpd.server_close();thread.join()

if __name__=='__main__': unittest.main()
