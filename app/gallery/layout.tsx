import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Gallery/Header/Header";
import Footer from "../components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallery",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-screen overflow-y-scroll bg-gradient-to-r from-blue-950 from-10%  to-indigo-600  flex justify-center scroll-smooth">
          <div className="w-full h-screen px-5 md:w-5/6 ">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
