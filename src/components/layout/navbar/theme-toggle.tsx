"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="block dark:hidden" />
      <Moon className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
