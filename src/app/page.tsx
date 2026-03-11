"use client";
import { CarouselSpacing } from "@/components/carousel-homepage";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="py-20 bg-gray-50 ml-5 mr-5">
        <div className="flex w-full justify-center">
          <div className="  px-12 py-8 py- flex w-full justify-center  bg-white rounded-2xl shadow-[0_12px_80px_rgba(230,255,41,0.6)] border border-gray-200 overflow-visible">
            <CarouselSpacing />
          </div>
        </div>
        <div className="w-full mx-auto grid md:grid-cols-1 lg:grid-cols-3 gap-8 text-center mt-10">
          <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-[0_12px_80px_rgba(230,255,41,0.6)] md:min-h-[520px] min-h-[420px] md:overflow-auto overflow-visible">
            <div className="h-30 w-30 border"></div>
            <h3 className="m-5 text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Safe, Smooth & Comfortable
            </h3>
            <p className="text-gray-600 text-left w-full px-2 md:px-6 text-sm md:text-base leading-relaxed md:leading-normal">
              Enjoy every ride with bikes designed for maximum safety, smooth
              performance, and complete comfort. Our modern bicycles are
              regularly maintained and equipped with high-quality components to
              ensure a reliable and enjoyable cycling experience. For your
              safety, every rental includes a helmet and essential equipment so
              you can ride with confidence. Whether you are exploring the city,
              riding through scenic routes, or simply enjoying a relaxing trip,
              our bikes are built to provide stability, easy handling, and a
              comfortable ride for all levels of cyclists. We focus on quality,
              safety, and convenience so that you can concentrate on what truly
              matters — enjoying the journey.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-[0_12px_80px_rgba(230,255,41,0.6)] md:min-h-[520px] min-h-[420px] md:overflow-auto overflow-visible">
            <div className="h-30 w-30 border"></div>
            <h3 className="m-5 text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Fresh Air & Pure Freedom
            </h3>
            <p className="text-gray-600 text-left w-full px-2 md:px-6 text-sm md:text-base leading-relaxed md:leading-normal">
              Leave the car behind and rediscover the joy of moving freely.
              Riding a bike allows you to breathe fresh air, feel the wind on
              your face, and enjoy the simple freedom of being outdoors. Every
              ride becomes a moment to relax, clear your mind, and connect with
              the world around you. Whether you're exploring scenic paths,
              cruising through the city, or discovering new places, cycling
              gives you the freedom to move at your own pace. Feel the wind, own
              the moment, and enjoy every second of the journey while creating
              unforgettable memories along the way.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-[0_12px_80px_rgba(230,255,41,0.6)] md:min-h-[520px] min-h-[420px] md:overflow-auto overflow-visible">
            <div className="h-30 w-30 border"></div>
            <h3 className="m-5 text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Fun Guaranteed
            </h3>
            <p className="text-gray-600 text-left w-full px-2 md:px-6 text-sm md:text-base leading-relaxed md:leading-normal">
              Whether you're riding with family, exploring the city with
              friends, or enjoying a peaceful solo adventure, every bike ride
              promises a memorable experience. Cycling is more than just
              transportation — it's a fun and exciting way to discover new
              places, share special moments, and enjoy the outdoors. Our bikes
              are perfect for riders of all ages and experience levels, making
              every trip easy, enjoyable, and full of positive energy. From
              relaxed rides through scenic routes to spontaneous adventures
              around the city, one ride is all it takes to fall in love with the
              experience — and you'll definitely want to come back for more.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
