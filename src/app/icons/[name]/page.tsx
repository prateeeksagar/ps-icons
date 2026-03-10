import { notFound } from "next/navigation"
import { registry } from "@/registry/registry"
import { ArrowRightPreview } from "@/registry/icons/arrow-right/preview"

const previews: Record<string, React.ComponentType> = {
  "arrow-right": ArrowRightPreview,
}

interface IconPageProps {
  params: Promise<{ name: string }>
}

export function generateStaticParams() {
  return registry.map((icon) => ({ name: icon.name }))
}

export default async function IconDetailPage({ params }: IconPageProps) {
  const { name } = await params
  const icon = registry.find((r) => r.name === name)
  if (!icon) notFound()

  const Preview = previews[icon.name]

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{icon.label}</h1>
        <p className="mt-1 text-muted-foreground">{icon.description}</p>
      </div>

      {/* Live demo */}
      <div className="mb-8 flex items-center justify-center rounded-2xl border border-border bg-muted p-16">
        {Preview ? (
          <div className="text-foreground">
            <Preview />
          </div>
        ) : null}
      </div>

      {/* Install */}
      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Install
        </h2>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm">
          <span className="select-none text-primary">$</span>
          <span className="text-foreground">
            npx shadcn add https://ps-icons.dev/r/{icon.name}
          </span>
        </div>
      </div>

      {/* Props */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Props
        </h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Prop</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {[
                { prop: "size", type: "number", default: "24" },
                { prop: "color", type: "string", default: "currentColor" },
                { prop: "trigger", type: '"hover" | "click" | "auto"', default: '"hover"' },
                { prop: "reverse", type: "boolean", default: "false" },
                { prop: "loop", type: "boolean", default: "false" },
                { prop: "duration", type: "number", default: "0.3" },
                { prop: "className", type: "string", default: "—" },
              ].map((row) => (
                <tr key={row.prop}>
                  <td className="px-4 py-2.5 font-mono text-foreground">{row.prop}</td>
                  <td className="px-4 py-2.5 font-mono text-primary">{row.type}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground">{row.default}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
