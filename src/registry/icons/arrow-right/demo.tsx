"use client"
import { useState } from "react"
import { ArrowRightIcon, ArrowRightVariant } from "./index"

const VARIANTS: { value: ArrowRightVariant; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "path", label: "Path" },
  { value: "path-reverse", label: "Path Reverse" },
]

export const ArrowRightDemo = () => {
  const [variant, setVariant] = useState<ArrowRightVariant>("default")
  const [loop, setLoop] = useState(false)

  // path-loop always loops by design — hide the toggle for it

  return (
    <div className="w-full">
      {/* Controls bar */}
      <div className="mb-3 flex items-center justify-end gap-2">
        {/* Loop toggle */}
        <button
          onClick={() => setLoop(!loop)}
          className={[
            "rounded-md border px-3 py-1 text-xs font-medium transition-colors",
            loop
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          Loop
        </button>

        {/* Variant tabs */}
        <div className="border-border bg-background flex gap-1 rounded-lg border p-1">
          {VARIANTS.map((v) => (
            <button
              key={v.value}
              onClick={() => setVariant(v.value)}
              className={[
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                variant === v.value
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo area */}
      <div className="border-border bg-muted flex min-h-44 items-center justify-center rounded-2xl border">
        {/*
          key forces a full remount when variant or loop changes —
          cleanly resets all motion state without manual reset logic in the icon.
        */}
        <ArrowRightIcon
          key={`${variant}-${loop}`}
          variant={variant}
          loop={loop}
          trigger={"hover"}
          size={40}
        />
      </div>
    </div>
  )
}
