import HeroSection from "@/components/hero-section/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-y-0 left-0 flex items-center z-20 px-10">
          <h1 className="text-[#e6ff2a] text-4xl font-bold"></h1>
        </div>
        Welcome to Blabla<span className="text-[#e6ff2a]">Bike</span>
      </section>
    </main>
  );
}
