import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Motion Icons</h1>

        <p className="text-muted-foreground">
          Beautiful animated SVG icons for React.
        </p>

        <Link href="/icons">
          <Button size="lg">Browse Icons</Button>
        </Link>
      </div>
    </main>
  );
}
