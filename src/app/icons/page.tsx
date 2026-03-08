import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function IconsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold">Icons Listing Page</h1>

        <p className="text-muted-foreground">
          Beautiful animated SVG icons for React.
        </p>

        <Link href="/icons">
          <Button variant={"default"}>Browse Icons</Button>
        </Link>
      </div>
    </main>
  )
}
