"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MessageCircle, CreditCard, User, Phone, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const packages = [
  { id: "avulsa", name: "Aula Avulsa", price: 140, lessons: 1 },
  { id: "bronze", name: "Pacote Bronze", price: 380, lessons: 3 },
  { id: "prata", name: "Pacote Prata", price: 630, lessons: 5 },
  { id: "ouro", name: "Pacote Ouro", price: 1120, lessons: 10 },
]

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00"
]

const experienceLevels = [
  { id: "iniciante", label: "Nunca surfei", description: "Primeira vez na prancha" },
  { id: "basico", label: "Já tentei algumas vezes", description: "Conhece o básico" },
  { id: "intermediario", label: "Consigo ficar de pé", description: "Buscando evoluir" },
]

// Ingryd's WhatsApp number (replace with real number)
const WHATSAPP_NUMBER = "5521995007374"

// Emojis como code points (evita "?" na URL/WhatsApp por sequências ZWJ quebradas)
const WA = {
  surf: String.fromCodePoint(0x1f3c4), // pessoa surfando
  user: String.fromCodePoint(0x1f464), // nome
  phone: String.fromCodePoint(0x1f4f1), // telefone
  email: String.fromCodePoint(0x1f4e7), // e-mail
  package: String.fromCodePoint(0x1f4e6), // pacote
  money: String.fromCodePoint(0x1f4b0), // valor
  calendar: String.fromCodePoint(0x1f4c5), // data
  clock: String.fromCodePoint(0x23f0), // horário
  target: String.fromCodePoint(0x1f3af), // nível
  chat: String.fromCodePoint(0x1f4ac), // observações
  check: String.fromCodePoint(0x2705), // pagamento online
  card: String.fromCodePoint(0x1f4b3), // pagamento no local
} as const

export function Booking() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    package: "avulsa",
    date: "",
    time: "",
    experience: "iniciante",
    message: "",
    payNow: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Get package from URL if present
  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('pacote=')) {
      const pacote = decodeURIComponent(hash.split('pacote=')[1])
      const pkg = packages.find(p => p.name.toLowerCase().includes(pacote.toLowerCase().split(' ')[1]))
      if (pkg) {
        setFormData(prev => ({ ...prev, package: pkg.id }))
      }
    }
  }, [])

  const selectedPackage = packages.find(p => p.id === formData.package)

  const generateWhatsAppMessage = () => {
    const pkg = packages.find(p => p.id === formData.package)
    const exp = experienceLevels.find(e => e.id === formData.experience)
    
    const message = `${WA.surf} *NOVA RESERVA DE AULA*

${WA.user} *Nome:* ${formData.name}
${WA.phone} *Telefone:* ${formData.phone}
${WA.email} *Email:* ${formData.email}

${WA.package} *Pacote:* ${pkg?.name} (${pkg?.lessons} aula${pkg && pkg.lessons > 1 ? 's' : ''})
${WA.money} *Valor:* R$ ${pkg?.price.toFixed(2).replace('.', ',')}

${WA.calendar} *Data:* ${new Date(formData.date).toLocaleDateString('pt-BR')}
${WA.clock} *Horário:* ${formData.time}

${WA.target} *Nível:* ${exp?.label}

${formData.message ? `${WA.chat} *Observações:* ${formData.message}` : ''}

${formData.payNow ? `${WA.check} Cliente deseja pagar online` : `${WA.card} Pagamento no local`}`

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`

    // Abrir na mesma ação do clique (sem await/setTimeout), senão o navegador bloqueia window.open em produção.
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    if (!opened) {
      window.location.href = whatsappUrl
    }

    setIsSuccess(true)
    setIsSubmitting(false)
  }

  const handlePayment = () => {
    // For now, redirect to WhatsApp with payment note
    // In production, integrate with Stripe or MercadoPago
    setFormData(prev => ({ ...prev, payNow: true }))
    setStep(3)
  }

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const resetBookingAfterClose = () => {
    setIsSuccess(false)
    setStep(1)
    setFormData({
      name: "",
      phone: "",
      email: "",
      package: "avulsa",
      date: "",
      time: "",
      experience: "iniciante",
      message: "",
      payNow: false,
    })
  }

  return (
    <section id="agendar" className="py-24 bg-muted/50">
      <Dialog
        open={isSuccess}
        onOpenChange={(open) => {
          if (!open) resetBookingAfterClose()
        }}
      >
        <DialogContent className="max-h-[min(90dvh,100%)] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Solicitação recebida
            </DialogTitle>
            <DialogDescription className="text-center text-base leading-relaxed">
              Obrigado pelo seu interesse! Em breve retornaremos o contato para{" "}
              <strong className="text-foreground">confirmar seu agendamento</strong>
              {" "}(data, horário e detalhes da aula).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button type="button" className="w-full sm:w-auto" onClick={resetBookingAfterClose}>
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Calendar className="h-4 w-4" />
            Agendamento
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Agende Sua Aula de Surf
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Escolha o melhor dia e horário para sua experiência. 
            A confirmação será feita diretamente pelo WhatsApp.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                    step >= s 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={cn(
                      "w-16 md:w-24 h-1 mx-2",
                      step > s ? "bg-primary" : "bg-muted"
                    )} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mb-6">
              <span>Pacote & Data</span>
              <span>Seus Dados</span>
              <span>Confirmação</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Package & Date */}
            {step === 1 && (
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Escolha seu pacote</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, package: pkg.id }))}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          formData.package === pkg.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="font-semibold text-foreground">{pkg.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {pkg.lessons} aula{pkg.lessons > 1 ? 's' : ''} • R$ {pkg.price.toFixed(2).replace('.', ',')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-base font-semibold mb-2 block">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Data da primeira aula
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      min={getMinDate()}
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold mb-2 block">
                      <Clock className="inline h-4 w-4 mr-2" />
                      Horário preferido
                    </Label>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, time }))}
                          className={cn(
                            "py-2 px-1 text-sm rounded-lg border transition-all",
                            formData.time === time
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Seu nível de experiência</Label>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, experience: level.id }))}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all",
                          formData.experience === level.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="font-semibold text-foreground">{level.label}</div>
                        <div className="text-sm text-muted-foreground">{level.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  type="button" 
                  onClick={() => setStep(2)}
                  disabled={!formData.date || !formData.time}
                  className="w-full h-12"
                  size="lg"
                >
                  Continuar
                </Button>
              </CardContent>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                      <User className="inline h-4 w-4 mr-2" />
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                      <Phone className="inline h-4 w-4 mr-2" />
                      WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(21) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base font-semibold mb-2 block">
                      Observações (opcional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Alguma informação adicional? (lesões, medos, objetivos...)"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12"
                  >
                    Voltar
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setStep(3)}
                    disabled={!formData.name || !formData.phone}
                    className="flex-1 h-12"
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <CardContent className="space-y-6">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo da Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pacote</span>
                      <span className="font-medium">{selectedPackage?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data</span>
                      <span className="font-medium">
                        {formData.date && new Date(formData.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nome</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-primary">
                        R$ {selectedPackage?.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {isSubmitting ? 'Enviando...' : 'Confirmar via WhatsApp'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handlePayment}
                    className="w-full h-14 text-lg"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pagar Antecipado (Pix/Cartão)
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    O pagamento pode ser feito no local ou antecipadamente
                  </p>
                </div>

                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="w-full"
                >
                  Voltar e editar
                </Button>
              </CardContent>
            )}
          </form>
        </Card>
      </div>
    </section>
  )
}
