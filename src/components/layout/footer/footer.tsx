import Link from "next/link"
import { Zap } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary">
            <Zap className="size-3.5 fill-primary-foreground text-primary-foreground" />
          </div>
          PS Icons
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/icons" className="transition-colors hover:text-foreground">
            Icons
          </Link>
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PS Icons. MIT License.
        </p>
      </div>
    </footer>
  )
}