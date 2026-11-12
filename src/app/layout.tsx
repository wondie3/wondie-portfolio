import type { Metadata, Viewport } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { personal } from "../data/personal";

const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${personal.name} | ${personal.brand}`;
const description = `Portfolio of ${personal.name} (${personal.brand}): Computer Science student and developer at ${personal.university}. Explore projects, certificates and contact details.`;

export const metadata: Metadata = {
  metadataBase: personal.siteUrl ? new URL(personal.siteUrl) : undefined,
  title: { default: title, template: `%s | ${personal.brand}` },
  description,
  applicationName: `${personal.brand} Portfolio`,
  authors: [{ name: personal.name, url: personal.social.github }],
  keywords: [personal.name, personal.brand, "portfolio", "Computer Science", personal.university, "software developer", "Flutter", "React", "Next.js"],
  openGraph: { title, description, type: "website", siteName: `${personal.brand} Portfolio`, locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030d07",
  colorScheme: "dark",
};

const themeScript =
  "try{if(localStorage.getItem('wondie-theme')==='blue')document.documentElement.dataset.theme='blue'}catch(e){}";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  alternateName: personal.brand,
  email: "mailto:" + personal.email,
  sameAs: [personal.social.github, personal.social.linkedin],
  ...(personal.siteUrl ? { url: personal.siteUrl } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#projects">
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
