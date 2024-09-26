import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const rubik = Rubik({ subsets: ["latin"] });
export async function generateMetadata() {
  return {
    title: "tautology",
    description:
      "A lightweight mobile-friendly web application to visualize and evaluate boolean algebra expressions plus some spice.",
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={rubik.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
