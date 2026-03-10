// src/app/r/[name]/route.ts
import { readFileSync } from "fs"
import { join } from "path"
import { registry } from "@/registry/registry"

export async function GET(
  _req: Request,
  { params }: { params: { name: string } }
) {
  // 1. Find the icon's metadata
  const meta = registry.find((r) => r.name === params.name)
  if (!meta) return new Response("Not found", { status: 404 })

  // 2. Read the actual component file from disk (server only)
  const filePath = join(
    process.cwd(),
    "src/registry/icons",
    params.name,
    "index.tsx"
  )
  const content = readFileSync(filePath, "utf-8")

  // 3. Return the registry JSON shape shadcn CLI expects
  return Response.json({
    name: meta.name,
    type: "registry:ui",
    dependencies: meta.dependencies, // gets npm installed
    files: [
      {
        path: `components/icons/${meta.name}.tsx`,
        content, // raw source code as a string
        type: "registry:ui",
        target: `components/icons/${meta.name}.tsx`, // where it lands in user's project
      },
    ],
  })
}
