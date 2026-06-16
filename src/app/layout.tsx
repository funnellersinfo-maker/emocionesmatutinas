import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emociones Matutinas · Regalos premium en Bogotá",
  description: "El marketplace de regalos #1 en Bogotá. Peluches, flores, desayunos, globos, cumpleaños, aniversarios, personalizados y sorpresas. Entrega hoy.",
  keywords: ["regalos Bogotá", "flores", "peluches", "desayunos", "globos", "cumpleaños", "aniversarios", "regalos personalizados"],
  authors: [{ name: "Emociones Matutinas" }],
  openGraph: {
    title: "Emociones Matutinas · Regalos premium en Bogotá",
    description: "Regalos que enamoran al instante. Entrega hoy en toda Bogotá.",
    siteName: "Emociones Matutinas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
