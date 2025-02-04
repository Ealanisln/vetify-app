import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google"; // Changed import
import { UserProvider } from "@/src/lib/auth";
import { getUser } from "@/src/lib/db/queries";

const siteUrl = process.env.SITE_URL || "https://vetify.pro";

export const metadata: Metadata = {
  title: "Vetify | CRM para Clínicas Veterinarias",
  description:
    "Optimiza la gestión de tu clínica veterinaria con nuestro CRM especializado. Historiales médicos, citas y facturación en una sola plataforma intuitiva.",
  keywords:
    "CRM veterinario, software veterinario, gestión clínica veterinaria, historiales médicos mascotas, citas veterinarias, facturación veterinaria",
  manifest: "/favicon/manifest.json",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
  openGraph: {
    title: "Vetify | CRM para Clínicas Veterinarias",
    description:
      "Optimiza la gestión de tu clínica veterinaria con nuestro CRM especializado. Historiales médicos, citas y facturación en una sola plataforma intuitiva.",
    images: [
      {
        url: `${siteUrl}/OG-Share.jpg`, 
        width: 1200,
        height: 630,
        alt: "Vetify CRM Veterinario - Gestión Integral para Clínicas",
      },
    ],
    locale: "es_ES",
    type: "website",
    siteName: "Vetify",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vetify | CRM para Clínicas Veterinarias",
    description:
      "Optimiza la gestión de tu clínica veterinaria con nuestro CRM especializado.",
    images: [`${siteUrl}/OG-Share.jpg`],
    creator: "@vetify_crm", // Agrega tu usuario de Twitter si tienes
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl, // Mejor práctica SEO
  },
  // Opcional: Para PWA avanzado
  applicationName: "Vetify CRM",
  appleWebApp: {
    capable: true,
    title: "Vetify CRM",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

// Configure Quicksand font
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Specify required weights
  variable: "--font-quicksand",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="es"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${quicksand.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  );
}
