"use client"
import { useEffect, useRef } from "react"
import { motion, useAnimate } from "motion/react"

export type ArrowRightVariant = "default" | "default-loop" | "path" | "path-loop"

export interface ArrowRightIconProps {
  size?: number
  color?: string
  strokeWidth?: number
  variant?: ArrowRightVariant
  trigger?: "hover" | "click" | "auto"
  reverse?: boolean
  duration?: number
  className?: string
}

export const ArrowRightIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  variant = "default",
  trigger = "hover",
  reverse = false,
  duration = 0.3,
  className,
}: ArrowRightIconProps) => {
  const [scope, animate] = useAnimate()
  const isAnimating = useRef(false)

  // "default" — head moves further than line (parallax feel)
  const playDefault = async () => {
    const dir = reverse ? -1 : 1
    animate('[data-path="line"]', { x: dir * 3 }, { duration: duration * 0.4, ease: "easeOut" })
    await animate('[data-path="head"]', { x: dir * 6 }, { duration: duration * 0.4, ease: "easeOut" })
    animate('[data-path="line"]', { x: 0 }, { duration: duration * 0.6, ease: "easeInOut" })
    await animate('[data-path="head"]', { x: 0 }, { duration: duration * 0.6, ease: "easeInOut" })
  }

  // "default-loop" — while loop so isAnimating controls the cycle cleanly
  const playDefaultLoop = async () => {
    while (isAnimating.current) {
      await playDefault()
    }
  }

  // "path" — draw the line first, then the arrowhead
  const playPath = async () => {
    await animate(
      '[data-path="line"]',
      { pathLength: [0, 1] },
      { duration: duration * 0.6, ease: "easeInOut" }
    )
    await animate(
      '[data-path="head"]',
      { pathLength: [0, 1] },
      { duration: duration * 0.4, ease: "easeInOut" }
    )
  }

  // "path-loop" — motion handles repeat, store controls for cleanup
  const loopControls = useRef<Array<{ cancel: () => void }>>([])
  const playPathLoop = () => {
    const a1 = animate('[data-path="line"]', { pathLength: [0, 1] }, {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    })
    const a2 = animate('[data-path="head"]', { pathLength: [0, 1] }, {
      duration,
      ease: "easeInOut",
      delay: duration * 0.3,
      repeat: Infinity,
      repeatType: "mirror",
    })
    loopControls.current = [a1, a2]
  }

  const variantMap: Record<ArrowRightVariant, () => void | Promise<void>> = {
    "default": playDefault,
    "default-loop": playDefaultLoop,
    "path": playPath,
    "path-loop": playPathLoop,
  }

  const play = () => {
    if (isAnimating.current) return
    isAnimating.current = true
    Promise.resolve(variantMap[variant]()).then(() => {
      isAnimating.current = false
    })
  }

  // Cancel all running animations on unmount
  useEffect(() => {
    return () => {
      isAnimating.current = false
      loopControls.current.forEach((ctrl) => ctrl.cancel())
    }
  }, [])

  useEffect(() => {
    if (trigger === "auto") play()
  }, [])

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        cursor: trigger === "click" ? "pointer" : "default",
      }}
      onMouseEnter={() => trigger === "hover" && play()}
      onClick={() => trigger === "click" && play()}
    >
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path data-path="line" d="M5 12h14" />
        <motion.path data-path="head" d="m12 5 7 7-7 7" />
      </motion.svg>
    </div>
  )
}