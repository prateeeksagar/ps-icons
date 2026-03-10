import Link from "next/link"
import { registry } from "@/registry/registry"
import { ArrowRightPreview } from "@/registry/icons/arrow-right/preview"

const previews: Record<string, React.ComponentType> = {
  "arrow-right": ArrowRightPreview,
}

export default function IconsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Icons</h1>
        <p className="mt-2 text-muted-foreground">
          {registry.length} animated icons. Hover to preview. Click to open.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {registry.map((icon) => {
          const Preview = previews[icon.name]
          return (
            <Link key={icon.name} href={`/icons/${icon.name}`}>
              <div className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted">
                <div className="flex size-10 items-center justify-center text-foreground">
                  {Preview ? <Preview /> : null}
                </div>
                <span className="w-full truncate text-center text-[11px] text-muted-foreground group-hover:text-foreground">
                  {icon.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
