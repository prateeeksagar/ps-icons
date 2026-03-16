// src/app/r/[name]/route.ts
import { readFileSync } from "fs"
import { join } from "path"
import { registry } from "@/registry/registry"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  // 1. Find the icon's metadata
  const meta = registry.find((r) => r.name === name)
  if (!meta) return new Response("Not found", { status: 404 })

  // 2. Read the actual component file from disk (server only)
  const filePath = join(
    process.cwd(),
    "src/registry/icons",
    name,
    "index.tsx"
  )
  const content = readFileSync(filePath, "utf-8")

  // 3. Return the registry JSON shape shadcn CLI expects
  return Response.json({
    name: meta.name,
    type: "registry:ui",
    dependencies: meta.dependencies,
    files: [
      {
        path: `components/icons/${meta.name}.tsx`,
        content,
        type: "registry:ui",
        target: `components/icons/${meta.name}.tsx`,
      },
    ],
  })
}