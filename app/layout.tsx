export const metadata = {
  title: 'store-chat',
  description: 'AI-powered application created with NovaKey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
