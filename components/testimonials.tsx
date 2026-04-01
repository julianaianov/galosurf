"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Marina Costa",
    location: "Barra da Tijuca",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "A Ingryd é simplesmente incrível! Nunca tinha pisado numa prancha e em 3 aulas já estava surfando. Ela tem uma paciência enorme e explica tudo com muita clareza. Super recomendo!",
    date: "Janeiro 2024"
  },
  {
    id: 2,
    name: "Pedro Henrique",
    location: "Copacabana",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "Dei de presente para minha filha de 12 anos e ela amou! A Ingryd sabe lidar muito bem com crianças e deixou ela super à vontade. Já fechamos o pacote de 10 aulas!",
    date: "Dezembro 2023"
  },
  {
    id: 3,
    name: "Carla Mendes",
    location: "Recreio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "Sempre tive medo do mar, mas a Ingryd me fez superar isso. Ela transmite muita segurança e conhece cada detalhe daquela praia. Hoje o surf virou minha terapia!",
    date: "Fevereiro 2024"
  },
  {
    id: 4,
    name: "Ricardo Alves",
    location: "Tijuca",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "Com 45 anos achei que seria difícil aprender, mas a Ingryd mostrou que idade não é desculpa. Método excelente, equipamentos de qualidade e muita dedicação. Vale cada centavo!",
    date: "Janeiro 2024"
  },
  {
    id: 5,
    name: "Julia Santos",
    location: "Leblon",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    text: "As fotos e vídeos que ela faz são um diferencial! Além de aprender a surfar, saí com registros lindos. A energia da Ingryd é contagiante, você sai da aula renovado.",
    date: "Março 2024"
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="depoimentos" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            Depoimentos
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            O Que Nossos Alunos Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Histórias reais de pessoas que transformaram seu sonho de surfar em realidade
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Quote className="absolute top-8 left-8 h-16 w-16 text-primary/10" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-sunset text-sunset" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  {`"${testimonials[currentIndex].text}"`}
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setIsAutoPlaying(false); setCurrentIndex(index); }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === currentIndex 
                      ? "bg-primary w-8" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Alunos formados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">5.0</div>
            <div className="text-muted-foreground">Nota média</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">98%</div>
            <div className="text-muted-foreground">Recomendariam</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">8+</div>
            <div className="text-muted-foreground">Anos de experiência</div>
          </div>
        </div>
      </div>
    </section>
  )
}
