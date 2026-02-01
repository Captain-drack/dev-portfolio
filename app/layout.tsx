import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import LayoutContent from "./LayoutContent";
import GlobalSplash from "./components/ui/GlobalSplash";
import { SplashProvider } from "./context/SplashContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Akshat Austin",
  description: "My portfolio to the universe and the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${playfair.variable} font-sans selection:bg-white selection:text-black`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <SplashProvider>
            <GlobalSplash />
            <LayoutContent>{children}</LayoutContent>
          </SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
