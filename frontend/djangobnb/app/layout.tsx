import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import SearchModal from "./components/modals/SearchModal";
import AddPropertyModal from "./components/modals/AddPropertyModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DjangoBNB",
  description: "A clone of AirBNB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const content = (
    <p>gvedve</p>
  )
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-32">
        {children}
        </div>

        <LoginModal />
        <SignupModal />
        <SearchModal />
        <AddPropertyModal />
      </body>
    </html>
  );
}
