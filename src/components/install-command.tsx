"use client"
import { toast } from "sonner"
import { CopyButton } from "@/components/copy-button"

export const InstallCommand = ({ name }: { name: string }) => {
  const command = `npx shadcn add https://ps-icons.dev/r/${name}`

  return (
    <div className="border-border bg-muted flex items-center justify-between gap-2 rounded-lg border px-4 py-3 font-mono text-sm">
      <div>
        <span className="text-primary select-none">$ </span>
        <span className="text-foreground">{command}</span>
      </div>
      <CopyButton
        variant={"secondary"}
        text={command}
        onCopySuccess={() => toast.success("Copied to clipboard")}
      />
    </div>
  )
}
