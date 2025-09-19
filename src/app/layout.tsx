import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lighting Bike",
  description: "Fast, reliable e-bike rentals delivered to your door in Orlando.",
  icons: {
    icon: "OuroLogo.png",         // put favicon.ico in /public
    shortcut: "OuroLogo.png",
    apple: "OuroLogo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript">
          {`
           window._mfq = window._mfq || [];
          (function() {
            console.log("HELLO")
            var mf = document.createElement("script");
            mf.type = "text/javascript"; mf.defer = true;
            mf.src = "//cdn.mouseflow.com/projects/06cc1018-27df-4a60-98e2-725da9cd878f.js";
            document.getElementsByTagName("head")[0].appendChild(mf);
          })(); 
          `}
      </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
