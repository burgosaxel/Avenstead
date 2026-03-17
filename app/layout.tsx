import type { Metadata } from "next";

import "@/app/globals.css";
import { AppProvider } from "@/components/providers/app-provider";

export const metadata: Metadata = {
  title: "Avenstead",
  description: "Your path to stability.",
  icons: {
    icon: "/branding/avenstead-mark.png",
    apple: "/branding/avenstead-mark.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
