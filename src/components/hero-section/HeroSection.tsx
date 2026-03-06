"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const PATH_CATALOG = "/catalog";

export default function HeroSection() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(buttonRef.current, {
      y: -500,
      opacity: 0,
      duration: 2,
    }).from(
      textRef.current,
      {
        x: -600,
        opacity: 0,
        duration: 2,
      },
      "-=0.4",
    );

    gsap.to(buttonRef.current, {
      scale: 1.03,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5,
    });
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/bg-image.png')" }}
    >
      <div ref={buttonRef} className="absolute z-20 pl-90 pt-120">
        <Link
          href={PATH_CATALOG}
          className="bg-[#e6ff2a] text-black font-medium text-5xl px-55 py-5 rounded-full shadow-lg hover:bg-yellow-300 transition"
        >
          Rent Now
        </Link>
      </div>

      <h1
        ref={textRef}
        className="absolute z-20 pl-92 pt-150 text-white text-7xl font-bold"
      >
        Savor the freedom <br />
        and joy of every <br />
        bike ride with us...
      </h1>
    </section>
  );
}
