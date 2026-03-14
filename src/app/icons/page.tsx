import Link from "next/link"
import { registry } from "@/registry/registry"
import { ArrowRightPreview } from "@/registry/icons/arrow-right/preview"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const previews: Record<string, React.ComponentType> = {
  "arrow-right": ArrowRightPreview,
}

export default function IconsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-primary text-3xl font-bold tracking-tight">
          Icons
        </h1>
        <p className="text-foreground mt-2 text-xl font-semibold">
          List of animated lucide icons with motion
        </p>
        <p className="text-muted-foreground text-md mt-2 font-semibold">
          {registry.length} available {registry.length == 1 ? "icon" : "icons"}.
          Hover to preview. Click to open.
        </p>
      </div>

      <div className="flex flex-row">
        {registry.map((icon) => {
          const Preview = previews[icon.name]
          return (
            <Tooltip key={icon.name}>
              <TooltipTrigger asChild>
                <Link key={icon.name} href={`/icons/${icon.name}`}>
                  <div className="group border-border bg-card hover:bg-muted flex flex-col items-center gap-3 rounded-sm border p-4 transition-colors">
                    <div className="text-foreground flex h-3 w-3 items-center justify-center">
                      {Preview ? <Preview /> : null}
                    </div>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>{icon.label}</TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
