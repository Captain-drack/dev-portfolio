"use client";
import { usePathname } from "next/navigation";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { GlobalBackground } from "./components/ui/GlobalBackground";
import { CustomCursor } from "./components/ui/CustomCursor";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGalleryPage = pathname === "/gallery";

  if (isGalleryPage) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <div
        className="min-h-screen w-full transition-colors duration-300 relative overflow-hidden"
        style={{
          backgroundColor: `rgb(var(--color-background))`,
          color: `rgb(var(--color-foreground))`,
        }}
      >
        <CustomCursor />
        <GlobalBackground />
        <Header />
        <main className="w-full relative z-0">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
