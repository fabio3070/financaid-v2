import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/navigation/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/landing-image.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
      </div>
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
    </main>
  );
}
