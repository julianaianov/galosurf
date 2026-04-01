import Link from "next/link"
import Image from "next/image"
import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react"

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#precos", label: "Preços" },
  { href: "#condicoes", label: "Condições" },
  { href: "#galeria", label: "Galeria" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#dicas", label: "Dicas" },
  { href: "#agendar", label: "Agendar" },
]

export function Footer() {
  return (
    <footer id="contato" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#inicio" className="inline-flex items-center mb-4">
              <Image
                src="/images/logo-galo.png"
                alt="Logo Ingryd Galo"
                width={760}
                height={272}
                className="h-28 sm:h-36 md:h-44 lg:h-52 xl:h-56 w-auto"
              />
            </Link>
            <p className="text-background/70 mb-6 max-w-md">
              Transformando sonhos em realidade através do surf. 
              Aulas personalizadas no Recreio dos Bandeirantes, Rio de Janeiro.
              Venha viver essa experiência!
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/ingridgalosurf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/5521999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contato@ingridgalo.com.br"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70">
                  Praia do Recreio dos Bandeirantes<br />
                  Posto 12 - Rio de Janeiro, RJ
                </span>
              </li>
              <li>
                <a 
                  href="https://wa.me/5521999999999"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  (21) 99999-9999
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contato@ingridgalo.com.br"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  contato@ingridgalo.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Ingryd Galo Surf. Todos os direitos reservados.
          </p>
          <p className="text-background/50 text-sm">
            Feito com amor pelo surf
          </p>
        </div>
      </div>
    </footer>
  )
}
