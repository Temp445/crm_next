import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const CONVERSION_ID = process.env.NEXT_PUBLIC_GA_ADS_CONVERSION_ID;


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "ACE CRM",
  description: "Switch from Excel to ACE CRM – an affordable, cloud-based CRM software built for small businesses, startups, and sales teams in India. Start free today.",
  keywords: "ACE CRM,ace crm,Best CRM software for small business,CRM for small business India,Free CRM software,CRM for Excel users,Easy CRM for small teams,CRM for lead tracking,CRM for sales pipeline,Cloud CRM India,Cloud CRM,CRM with quote generation,Affordable CRM for Indian business,Affordable CRM for Small business,Buy CRM software India,CRM for sales automation India,CRM for retail business India,CRM for retail business,CRM for small business,Affordable CRM India,Affordable CRM,CRM for startups,CRM for Excel users,Best CRM India 2025,CRM tool for small teams,Cloud CRM software,CRM for lead and deal tracking",

  openGraph: {
    title: "ACE CRM",
    description: "Switch from Excel to ACE CRM – an affordable, cloud-based CRM software built for small businesses, startups, and sales teams in India. Start free today.",
    url: "https://crm.acesoftcloud.in/",
    siteName: "ACE CRM",
    images: [
      {
        url: "https://crm.acesoftcloud.in/assets/AceLogo.png",
        width: 1200,
        height: 630,
        alt: "ACE CRM – Smart CRM Tool",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/AceLogo.png" />
   
<Script async src={`https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`}/>

<Script id="google-ads-init" strategy="afterInteractive">
 {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${CONVERSION_ID}');
  `}
</Script>
      </head>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}