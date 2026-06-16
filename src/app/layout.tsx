import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emocionesmatutinas.pages.dev"),
  title: "Emociones Matutinas · Regalos premium en Bogotá",
  description:
    "El marketplace de regalos #1 en Bogotá. Peluches, flores, desayunos, globos, cumpleaños, aniversarios, personalizados y sorpresas. Entrega hoy.",
  keywords: [
    "regalos Bogotá",
    "flores",
    "peluches",
    "desayunos",
    "globos",
    "cumpleaños",
    "aniversarios",
    "regalos personalizados",
    "sorpresas",
  ],
  authors: [{ name: "Emociones Matutinas" }],
  creator: "Emociones Matutinas",
  openGraph: {
    title: "Emociones Matutinas · Regalos premium en Bogotá",
    description:
      "Regalos que enamoran al instante. Entrega hoy en toda Bogotá. Peluches, flores, desayunos y sorpresas.",
    siteName: "Emociones Matutinas",
    type: "website",
    locale: "es_CO",
    url: "https://emocionesmatutinas.pages.dev",
    images: [
      {
        url: "/hero-banner.png",
        width: 1344,
        height: 768,
        alt: "Emociones Matutinas — Regalos premium en Bogotá",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emociones Matutinas · Regalos premium en Bogotá",
    description:
      "Regalos que enamoran al instante. Entrega hoy en toda Bogotá.",
    images: ["/hero-banner.png"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
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
