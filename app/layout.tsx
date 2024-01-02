import { Nav } from "@/components/Nav";
import "./globals.css";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 bg-opacity-40 min-h-screen`}>
        <Providers>
          <Nav />
          <main className="max-w-6xl mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
