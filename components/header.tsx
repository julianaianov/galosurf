"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#precos", label: "Preços" },
  { href: "#condicoes", label: "Condições" },
  { href: "#galeria", label: "Galeria" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#dicas", label: "Dicas" },
  { href: "#contato", label: "Contato" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)]",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto max-w-[100vw] px-3 sm:px-4 py-1.5 sm:py-2 md:py-3">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Link href="#inicio" className="group flex min-w-0 max-w-[72%] shrink items-center sm:max-w-none">
            <Image
              src="/images/logo-galo.png"
              alt="Logo Ingryd Galo"
              width={640}
              height={230}
              className="h-11 w-auto max-h-[10vh] max-w-full object-contain object-left transition-transform group-hover:scale-[1.02] sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32"
              priority
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 240px, 320px"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isScrolled
                    ? "text-foreground/80 hover:text-primary hover:bg-primary/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:block">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
              <Link href="#agendar">Agendar Aula</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild size="lg" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#agendar" onClick={() => setIsMenuOpen(false)}>
                  Agendar Aula
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
