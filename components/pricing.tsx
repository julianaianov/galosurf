"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const packages = [
  {
    name: "Aula Avulsa",
    description: "Perfeita para experimentar",
    price: 140,
    originalPrice: null,
    duration: "1 hora",
    features: [
      "1 aula de 1 hora",
      "Prancha e lycra inclusos",
      "Fotos da aula",
      "Seguro incluso",
      "Teoria + prática"
    ],
    popular: false,
    discount: null
  },
  {
    name: "Pacote Bronze",
    description: "Ideal para iniciantes",
    price: 380,
    originalPrice: 420,
    duration: "3 aulas",
    features: [
      "3 aulas de 1 hora",
      "Prancha e lycra inclusos",
      "Fotos de todas as aulas",
      "Seguro incluso",
      "Acompanhamento de evolução",
      "Flexibilidade de horários"
    ],
    popular: false,
    discount: 10
  },
  {
    name: "Pacote Prata",
    description: "Mais popular",
    price: 630,
    originalPrice: 700,
    duration: "5 aulas",
    features: [
      "5 aulas de 1 hora",
      "Prancha e lycra inclusos",
      "Vídeos + fotos de todas as aulas",
      "Seguro incluso",
      "Relatório de evolução",
      "Horários prioritários",
      "1 aula extra de presente"
    ],
    popular: true,
    discount: 10
  },
  {
    name: "Pacote Ouro",
    description: "Evolução completa",
    price: 1120,
    originalPrice: 1400,
    duration: "10 aulas",
    features: [
      "10 aulas de 1 hora",
      "Prancha e lycra inclusos",
      "Vídeos + fotos profissionais",
      "Seguro incluso",
      "Análise técnica em vídeo",
      "Horários VIP",
      "2 aulas extras de presente",
      "Desconto em equipamentos"
    ],
    popular: false,
    discount: 20
  }
]

export function Pricing() {
  return (
    <section id="precos" className="py-24 bg-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            Investimento
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Escolha seu pacote ideal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Pacotes pensados para cada momento da sua jornada no surf. 
            Quanto mais aulas, maior o desconto e mais brindes você ganha!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card 
              key={pkg.name}
              className={cn(
                "relative flex flex-col transition-all duration-300 hover:shadow-xl",
                pkg.popular && "border-primary shadow-lg shadow-primary/10 scale-105 z-10"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
                    <Sparkles className="h-4 w-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <CardHeader className={cn(pkg.popular && "pt-8")}>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-6">
                  {pkg.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                        -{pkg.discount}%
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      R$ {pkg.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.duration}</p>
                </div>

                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  asChild 
                  className={cn(
                    "w-full",
                    pkg.popular 
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                  size="lg"
                >
                  <Link href={`#agendar?pacote=${encodeURIComponent(pkg.name)}`}>
                    Escolher {pkg.name.split(' ')[1] || 'Aula'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Todos os pacotes incluem equipamentos e podem ser parcelados em até 3x sem juros.
          </p>
        </div>
      </div>
    </section>
  )
}
