import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import Navbar from "@/components/common/Navbar";

export const metadata: Metadata = {
  title: "Samya Tiwari — Portfolio",
  description: "CS undergrad @ MUJ. Full Stack & AI/ML developer. GSSoC '26 contributor. IEEE CS Senior Coordinator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
