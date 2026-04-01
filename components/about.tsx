import Image from "next/image"
import { Award, Heart, Users, Sparkles } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Certificada",
    description: "Instrutora certificada pela ISA (International Surfing Association)"
  },
  {
    icon: Heart,
    title: "Apaixonada",
    description: "Surfista desde os 12 anos, com amor pelo mar e pelo ensino"
  },
  {
    icon: Users,
    title: "Dedicada",
    description: "Aulas individuais ou em grupos pequenos para máximo aprendizado"
  },
  {
    icon: Sparkles,
    title: "Método Próprio",
    description: "Técnica desenvolvida para você pegar ondas desde a primeira aula"
  }
]

export function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/galo.png"
                alt="Ingryd Galo - Instrutora de Surf"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">+500 alunos</span>
              </div>
              <p className="text-sm text-foreground font-medium">
                {"\"A melhor decisão que tomei foi aprender a surfar com a Ingryd!\""}
              </p>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              Conheça sua instrutora
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Transforme seu sonho de surfar em realidade
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Olá! Sou a Ingryd Galo, surfista profissional e instrutora há mais de 8 anos. 
              Nascida e criada no Recreio, conheço cada cantinho dessas ondas. Minha missão 
              é te mostrar que qualquer pessoa pode surfar, independente da idade ou 
              condição física.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
