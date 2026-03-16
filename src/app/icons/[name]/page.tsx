import { notFound } from "next/navigation"
import { registry } from "@/registry/registry"
import { ArrowRightDemo } from "@/registry/icons/arrow-right/demo"

const demos: Record<string, React.ComponentType> = {
  "arrow-right": ArrowRightDemo,
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

  const Demo = demos[icon.name]

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          {icon.label}
        </h1>
        <p className="text-muted-foreground mt-1">{icon.description}</p>
      </div>

      {/* Live demo */}
      <div className="mb-8">
        {Demo ? <Demo /> : null}
      </div>

      {/* Install */}
      <div className="mb-8">
        <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
          Install
        </h2>
        <div className="border-border bg-muted flex items-center gap-2 rounded-lg border px-4 py-3 font-mono text-sm">
          <span className="text-primary select-none">$</span>
          <span className="text-foreground">
            npx shadcn add https://ps-icons.dev/r/{icon.name}
          </span>
        </div>
      </div>

      {/* Props */}
      <div>
        <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
          Props
        </h2>
        <div className="border-border overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-muted-foreground px-4 py-2.5 text-left font-medium">
                  Prop
                </th>
                <th className="text-muted-foreground px-4 py-2.5 text-left font-medium">
                  Type
                </th>
                <th className="text-muted-foreground px-4 py-2.5 text-left font-medium">
                  Default
                </th>
              </tr>
            </thead>
            <tbody className="divide-border bg-card divide-y">
              {[
                { prop: "size", type: "number", default: "24" },
                { prop: "color", type: "string", default: "currentColor" },
                { prop: "strokeWidth", type: "number", default: "2" },
                { prop: "variant", type: '"default" | "path" | "path-loop"', default: '"default"' },
                { prop: "loop", type: "boolean", default: "false" },
                { prop: "trigger", type: '"hover" | "click" | "auto"', default: '"hover"' },
                { prop: "reverse", type: "boolean", default: "false" },
                { prop: "duration", type: "number", default: "0.3" },
                { prop: "className", type: "string", default: "—" },
              ].map((row) => (
                <tr key={row.prop}>
                  <td className="text-foreground px-4 py-2.5 font-mono">
                    {row.prop}
                  </td>
                  <td className="text-primary px-4 py-2.5 font-mono">
                    {row.type}
                  </td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono">
                    {row.default}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
