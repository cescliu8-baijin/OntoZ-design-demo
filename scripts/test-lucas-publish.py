"""Publication and inquiry regressions using an isolated temporary database."""
import copy
import http.client
import importlib.util
import json
from pathlib import Path
import sqlite3
import sys
import tempfile
import threading
import unittest

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('lucas_demo', Path(__file__).with_name('lucas-demo-server.py'))
server = importlib.util.module_from_spec(spec)
spec.loader.exec_module(server)


class PublishTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(prefix='lucas-publish-')
        server.DB = Path(cls.temp.name) / 'state.sqlite3'
        with sqlite3.connect(server.DB) as db:
            db.execute('CREATE TABLE state (id INTEGER PRIMARY KEY, body TEXT NOT NULL)')
        cls.httpd = server.ThreadingHTTPServer(('127.0.0.1', 0), server.Handler)
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.thread.join()
        cls.temp.cleanup()

    def setUp(self):
        self.state = server.initial()
        profile = {key: 'Demo' for key in ['name', 'type', 'industry', 'intro', 'goal', 'customers', 'product', 'description', 'owner', 'cta']}
        profile.update(email='sales@example.com', privacy=False)
        self.state.update(generated=True, draft={'profile': profile, 'design': {'primary': '#4f46e5', 'hero': 'brand', 'modules': []}, 'launch': {'domain': 'www.example.com', 'inquiryEmail': 'sales@example.com', 'language': 'English'}})
        server.write(self.state)

    def post(self, path, payload):
        client = http.client.HTTPConnection(*self.httpd.server_address)
        try:
            client.request('POST', '/api/lucas/' + path, json.dumps(payload), {'Content-Type': 'application/json'})
            response = client.getresponse()
            return response.status, json.loads(response.read())
        finally:
            client.close()

    def test_publish_without_inquiries_or_test_privacy_gate(self):
        self.assertEqual(server.check(self.state)['blocking'], [])
        status, result = self.post('publish', {'revision': 0, 'requestId': 'first-publish'})
        self.assertEqual(status, 200)
        self.assertEqual(result['published']['version'], 1)
        self.assertEqual(result['leads'], [])

    def test_test_inquiry_removed_and_public_inquiry_still_deduplicates(self):
        payload = {'email': 'buyer@example.com', 'message': 'Product inquiry', 'consent': True, 'submission_id': 'new-lead'}
        self.assertEqual(self.post('lead', payload)[0], 400)
        self.assertEqual(self.post('publish', {'revision': 0, 'requestId': 'first-publish'})[0], 200)
        self.assertEqual(self.post('lead', {**payload, 'test': True})[0], 400)
        self.assertEqual(server.read()['leads'], [])
        first = self.post('lead', payload)
        self.assertEqual(first[0], 200)
        self.assertEqual(self.post('lead', payload), first)
        self.assertEqual(len(server.read()['leads']), 1)
        self.assertFalse(server.read()['leads'][0]['test'])

    def test_content_and_domain_checks_still_block(self):
        for change in ['generation', 'domain', 'email']:
            state = copy.deepcopy(self.state)
            if change == 'generation':
                state['generated'] = False
            elif change == 'domain':
                state['draft']['launch']['domain'] = '123'
            else:
                state['draft']['launch']['inquiryEmail'] = 'invalid'
            server.write(state)
            self.assertEqual(self.post('publish', {'revision': 0, 'requestId': change})[0], 400)
            self.assertIsNone(server.read()['published'])


if __name__ == '__main__':
    unittest.main()
