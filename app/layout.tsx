import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site-wide defaults. Pages can override any field with their own metadata.
export const metadata: Metadata = {
  title: {
    // Used when a page doesn't set its own title (e.g. the home page).
    default: "Daniel Paulino | Project Portfolio",
    // A page with title "About" becomes "About | Project Portfolio".
    template: "%s | Project Portfolio",
  },
  description:
    "Portfolio of Daniel Paulino, showcasing web development projects built with Next.js, React and Tailwind CSS.",
  // Turns relative URLs (like /opengraph-image.png) into absolute ones,
  // which social networks need for link previews.
  metadataBase: new URL("https://wdd430-portfolio-gray.vercel.app"),
  openGraph: {
    siteName: "Daniel Paulino | Project Portfolio",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
