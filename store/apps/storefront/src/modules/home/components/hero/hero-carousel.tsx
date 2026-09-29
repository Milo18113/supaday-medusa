"use client"

import { clx } from "@modules/common/components/ui"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

export type HeroSlide = {
  src: string
  alt: string
}

type HeroCarouselProps = {
  slides: HeroSlide[]
  intervalMs?: number
  children?: React.ReactNode
}

const HeroCarousel = ({
  slides,
  intervalMs = 5000,
  children,
}: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const total = slides.length

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total]
  )

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (isPaused || reducedMotion || total < 2) {
      return
    }
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), intervalMs)
    return () => clearInterval(id)
  }, [isPaused, reducedMotion, total, intervalMs])

  return (
    <section
      className="relative h-[80vh] min-h-[480px] w-full overflow-hidden bg-andes-tierra"
      aria-roledescription="carrusel"
      aria-label="Productos artesanales destacados"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== current}
          className={clx(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Overlay para que el texto del hero sea legible sobre cualquier foto */}
      <div className="absolute inset-0 bg-gradient-to-t from-andes-tierra/85 via-andes-tierra/50 to-andes-tierra/30" />

      <div className="relative z-10 h-full">{children}</div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-andes-lana/20 text-andes-lana backdrop-blur-sm hover:bg-andes-lana/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-andes-ocre"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-andes-lana/20 text-andes-lana backdrop-blur-sm hover:bg-andes-lana/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-andes-ocre"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ir a la imagen ${index + 1}: ${slide.alt}`}
                aria-current={index === current}
                className={clx(
                  "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-andes-ocre",
                  index === current
                    ? "w-8 bg-andes-ocre"
                    : "w-2.5 bg-andes-lana/60 hover:bg-andes-lana"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HeroCarousel
