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
      </div>
      <div className="absolute inset-0 bg-black/30 z-10" />
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
      <div className="relative">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white">Welcome to Our Platform</h1>
          {/* Add your landing page content here */}
        </div>
      </div>
    </main>
  );
}
