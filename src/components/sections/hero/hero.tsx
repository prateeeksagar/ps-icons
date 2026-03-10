import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      {/* Headline */}
      <h1 className="text-foreground max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Animated icons for your <span className="text-primary">React</span> app
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground max-w-xl text-base sm:text-lg">
        Copy, paste, and animate. Every icon ships with a unique default
        animation powered by Motion. No extra dependencies — just drop it in
        like a shadcn component.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" asChild>
          <Link href="/icons">
            Browse Components
            <ArrowRight />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/docs">Read the docs</Link>
        </Button>
      </div>

      {/* Install snippet */}
      <div className="border-border bg-muted text-muted-foreground mt-2 flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-sm">
        <span className="text-primary select-none">$</span>
        <span>npx shadcn add https://ps-icons.dev/r/arrow-right</span>
      </div>
    </section>
  )
}

export default Hero
