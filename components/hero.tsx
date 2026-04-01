"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, Play } from "lucide-react"
import { useState } from "react"

const INSTAGRAM_REEL_URL =
  "https://www.instagram.com/reel/DIKRPVfuvhF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
const INSTAGRAM_REEL_EMBED = "https://www.instagram.com/reel/DIKRPVfuvhF/embed/"

export function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section id="inicio" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-surf.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/70 via-ocean-dark/50 to-ocean-dark/80" />
      </div>

      {/* Animated Wave Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--background)"
            fillOpacity="0.8"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,128L48,149.3C96,171,192,213,288,218.7C384,224,480,192,576,186.7C672,181,768,203,864,208C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-[100vw] px-3 pb-28 pt-24 text-center sm:px-4 sm:pb-32 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-green-400 sm:h-2 sm:w-2" />
            <span className="text-balance">Recreio dos Bandeirantes, RJ</span>
          </div>
          
          <h1 className="mb-4 text-balance text-3xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-6xl lg:text-7xl">
            Aprenda a Surfar com
            <span className="block text-sunset">Ingryd Galo</span>
          </h1>
          
          <p className="mx-auto mb-6 max-w-2xl text-pretty text-base text-white/80 sm:mb-8 sm:text-lg md:text-xl">
            Descubra a liberdade das ondas com aulas personalizadas no paraíso do surf carioca. 
            Do primeiro drop até manobras avançadas.
          </p>

          <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full bg-primary px-6 py-5 text-base text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105 hover:bg-primary/90 sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
            >
              <Link href="#agendar">Agendar Minha Aula</Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full px-6 py-5 text-base text-yellow-950 backdrop-blur-sm hover:text-yellow-950 sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
              style={{ backgroundColor: "#f5b860", borderColor: "#f5b860" }}
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="mr-2 h-5 w-5 shrink-0" />
              Ver Vídeo
            </Button>
          </div>

          <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 sm:mt-12 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">500+</div>
              <div className="text-xs text-white/60 sm:text-sm">Alunos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">8+</div>
              <div className="text-xs text-white/60 sm:text-sm">Anos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">5.0</div>
              <div className="text-xs text-white/60 sm:text-sm">Avaliação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 animate-bounce pb-[env(safe-area-inset-bottom)] sm:bottom-24">
        <Link href="#sobre" className="text-white/60 hover:text-white transition-colors">
          <ChevronDown className="h-8 w-8" />
        </Link>
      </div>

      {/* Video Modal — tela cheia */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 z-[100] bg-black pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            className="relative h-full min-h-0 w-full min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={INSTAGRAM_REEL_EMBED}
              title="Reel no Instagram"
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <a
              href={INSTAGRAM_REEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 py-2.5 text-center text-xs text-white/90 hover:bg-black/80 hover:text-white sm:py-3 sm:text-sm"
            >
              Abrir no Instagram
            </a>
            <button
              type="button"
              className="absolute top-2 right-2 z-20 rounded-full bg-black/60 p-2.5 text-white shadow-lg transition-colors hover:bg-black/80 sm:top-4 sm:right-4 sm:p-3 md:top-6 md:right-6 md:p-4"
              onClick={() => setIsVideoPlaying(false)}
            >
              <span className="sr-only">Fechar</span>
              <span className="text-xl leading-none md:text-2xl" aria-hidden>
                ✕
              </span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
