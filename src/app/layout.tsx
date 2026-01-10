import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jiela's Gown Rental",
  description: "Premium gown rental service for your special occasions",
  icons: {
    icon: "/jielas-gown-rental-browser-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400..900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/jielas-gown-rental-browser-logo.png" type="image/png" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
