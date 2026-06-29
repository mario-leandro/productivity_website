import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import SideBar from "@/src/components/SideBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syncro",
  description: "This website was inspired by Jira, Miro, and ClickUp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} h-full antialiased dark`}>
      <body className="h-full">
        <Header />
        <SideBar />
        {children}
      </body>
    </html>
  );
}
