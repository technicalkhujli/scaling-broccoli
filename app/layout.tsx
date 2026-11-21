import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Utifix Lab — Content Creator Suite",
  description: "Plan, write, polish, and repurpose content in one simple creator workspace.",
  applicationName: "Utifix Lab",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
