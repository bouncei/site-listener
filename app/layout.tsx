"use client";
/* eslint-disable react/no-unescaped-entities */
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/Auth";
import { Header } from "@/components/modules";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster
            position="top-right"
            gutter={8}
            containerClassName="md:mt-[6em] md:ml-40"
          />
          <div className="bg-slate-700 min-h-screen text-white">
            <Header />
            <div className="p-8">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
