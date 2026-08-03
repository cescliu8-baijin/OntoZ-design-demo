import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OntoZ",
  description: "OntoZ 外贸增长智能体工作台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
