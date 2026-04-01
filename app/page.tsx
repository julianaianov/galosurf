import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Pricing } from "@/components/pricing"
import { WeatherConditions } from "@/components/weather-conditions"
import { LocationMap } from "@/components/location-map"
import { Booking } from "@/components/booking"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { SurfTips } from "@/components/surf-tips"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Pricing />
      <WeatherConditions />
      <LocationMap />
      <Booking />
      <Gallery />
      <Testimonials />
      <SurfTips />
      <Footer />
    </main>
  )
}
