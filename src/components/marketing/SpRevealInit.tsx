"use client";

import { useEffect } from "react";

/** Mounts an IntersectionObserver that adds `.in` to any `.sp-anim` element
 *  once 18 % of it is visible — triggering the fade-up entrance animation. */
export function SpRevealInit() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".sp-anim").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
