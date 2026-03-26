"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const PATH_CATALOG = "/catalog";

export default function HeroSection() {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current) return;

    const button = buttonRef.current;
    const text = textRef.current;
    gsap.set([button, text], { clearProps: "all" });
    gsap.killTweensOf([button, text]);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(button, {
      y: -500,
      opacity: 0,
      duration: 2,
    }).from(
      text,
      {
        x: -600,
        opacity: 0,
        duration: 2,
      },
      "-=0.4",
    );

    const pulseAnim = gsap.to(button, {
      scale: 1.03,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5,
    });

    return () => {
      tl.kill();
      pulseAnim.kill();
      gsap.killTweensOf([button, text]);
      gsap.set([button, text], { clearProps: "all" });
    };
  }, [pathname]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/assets/bg-mob.png"
        alt="Foggy Mobile Background"
        fill
        priority
        className="block md:hidden"
      />
      <Image
        src="/assets/bg-image.png"
        alt="Foggy Background"
        fill
        priority
        className="hidden md:block"
      />
      <div
        ref={buttonRef}
        className="absolute z-30 lg:pl-[18vw] lg:pt-[25vw] md:pl-[15vw] pl-[10vw] md:pt-[50vw] pt-[50vw]"
      >
        <Link
          href={PATH_CATALOG}
          className="bg-[#e6ff2a] text-black font-medium text-[6vw] md:text-[2.5vw] px-[14vw] md:px-[10vw] py-[4vw] md:py-[1vw] ml-20px rounded-full shadow-lg hover:bg-[#f56e07] transition"
        >
          Rent Now
        </Link>
      </div>

      <h1
        ref={textRef}
        className="absolute z-20 text-white md:pl-[14vw] pl-[7vw] md:pt-[60vw] pt-[70vw] lg:pl-[16vw] lg:pt-[30vw] text-balance text-[6vw] md:text-[4vw] font-bold leading-tight"
      >
        Savor the freedom <br />
        and joy of every <br />
        bike ride with us...
      </h1>
    </section>
  );
}
