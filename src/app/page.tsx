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
        <div className="absolute inset-x-0 top-0 h-[100vh] bg-gradient-to-b from-black/50 via-black/0 to-transparent z-10" />
      </div>
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
    </main>
  );
}
