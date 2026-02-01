import "./globals.css";
import type { Metadata } from "next";
import { Playwrite_NZ, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import LayoutContent from "./LayoutContent";
import GlobalSplash from "./components/ui/GlobalSplash";
import { SplashProvider } from "./context/SplashContext";

const playwrite = Playwrite_NZ({
  variable: "--font-playwrite",
  weight: ["100", "200", "300", "400"]
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
      <body className={`${playwrite.variable} ${playfair.variable} font-sans selection:bg-white selection:text-black`} suppressHydrationWarning={true}>
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
