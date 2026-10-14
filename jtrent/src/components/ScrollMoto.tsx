"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const motoCount = 6;
const staggeredStarts = [0, 0.2, 0.4, 0.6, 0.8, 0.9];
const directions = [1, -1, 1, -1, 1, -1];
const maxOpacity = 0.14;
const fadeDistance = 0.14;

export function ScrollMoto() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const main = image?.closest("main");
    if (!image || !main) return;
    const motos = Array.from(
      main.querySelectorAll<HTMLImageElement>(".scroll-moto"),
    );

    const mainElement = main;
    const brand =
      document.querySelector<HTMLElement>(
        ".brand-link .brand-logo-window",
      ) ?? document.querySelector<HTMLElement>(".brand-link");
    if (!brand) return;
    const brandElement = brand;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frame = 0;

    function update() {
      frame = 0;
      if (reducedMotion.matches) {
        motos.forEach((moto) => {
          moto.style.opacity = "0";
        });
        return;
      }

      const viewportHeight = window.innerHeight;
      const mainBottom = mainElement.getBoundingClientRect().bottom;
      if (mainBottom < viewportHeight * 0.28) {
        motos.forEach((moto) => {
          moto.style.opacity = "0";
        });
        return;
      }

      const brandBounds = brandElement.getBoundingClientRect();
      const headerBottom =
        document.querySelector(".header")?.getBoundingClientRect().bottom ?? 0;

      motos.forEach((moto, index) => {
        const bounds = moto.getBoundingClientRect();
        const direction = directions[index];
        const left =
          index === 0
            ? Math.max(0, brandBounds.left - bounds.width * 0.12)
            : -bounds.width * 0.88;
        const right = window.innerWidth - bounds.width * 0.88;
        const travel = right - left;
        const scrollDistance = Math.max(
          window.innerWidth * 2.8,
          travel / 0.34,
        );
        const distanceTravelled =
          window.scrollY * 0.34 +
          scrollDistance * staggeredStarts[index];
        const phase = distanceTravelled % scrollDistance;
        const cycle = Math.floor(distanceTravelled / scrollDistance);
        const progress = phase / scrollDistance;
        const x =
          direction === 1
            ? left + travel * progress
            : right - travel * progress;
        const laneProgress =
          0.14 + ((index - 1) / (motoCount - 2)) * 0.68;
        const y =
          index === 0
            ? Math.max(
                0,
                brandBounds.top +
                  brandBounds.height / 2 -
                  bounds.height / 2 +
                  Math.min(window.scrollY * 0.16, headerBottom),
              )
            : Math.max(
                headerBottom + 12,
                (viewportHeight - bounds.height) * laneProgress,
              );
        const fadeIn =
          index === 0 && cycle === 0
            ? 1
            : Math.min(1, progress / fadeDistance);
        const fadeOut = Math.min(1, (1 - progress) / fadeDistance);

        moto.style.transform = `translate3d(${x}px, ${y}px, 0) scaleX(${direction})`;
        moto.style.opacity = String(
          maxOpacity * Math.min(fadeIn, fadeOut),
        );
      });
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    update();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Image
        ref={imageRef}
        src="/images/jt-moto-scroll.png"
        alt=""
        aria-hidden="true"
        width={1376}
        height={768}
        priority
        draggable={false}
        className="scroll-moto"
      />
      {Array.from({ length: motoCount - 1 }, (_, index) => (
        <Image
          key={`scroll-moto-${index + 2}`}
          src="/images/jt-moto-scroll.png"
          alt=""
          aria-hidden="true"
          width={1376}
          height={768}
          draggable={false}
          className="scroll-moto"
        />
      ))}
    </>
  );
}
