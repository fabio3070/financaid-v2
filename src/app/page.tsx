import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/navigation/LandingPageNavbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/landing-image.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-60" />
        </div>
      </div>
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
    </main>
  );
}
