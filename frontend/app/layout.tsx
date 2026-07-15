import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Student Registration CRUD System",
  description: "A modern student registration dashboard built with Next.js, MUI, Axios, and React Hook Form."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}