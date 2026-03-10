"use client"
import { useEffect, useRef } from "react"
import { motion, useAnimate } from "motion/react"

interface ArrowRightIconProps {
  size?: number
  color?: string
  trigger?: "hover" | "click" | "auto"
  reverse?: boolean
  loop?: boolean
  duration?: number
  className?: string
}

export const ArrowRightIcon = ({
  size = 24,
  color = "currentColor",
  trigger = "hover",
  reverse = false,
  loop = false,
  duration = 0.3,
  className,
}: ArrowRightIconProps) => {
  const [scope, animate] = useAnimate()
  const isAnimating = useRef(false)

  const play = async () => {
    if (isAnimating.current) return
    isAnimating.current = true
    const dir = reverse ? -1 : 1
    await animate(scope.current, { x: dir * 5 }, { duration: duration * 0.4, ease: "easeOut" })
    await animate(scope.current, { x: 0 }, { duration: duration * 0.6, ease: "easeInOut" })
    isAnimating.current = false
    if (loop) play()
  }

  useEffect(() => {
    if (trigger === "auto") play()
  }, [trigger])

  return (
    <div
      className={className}
      style={{ display: "inline-flex" }}
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.svg>
    </div>
  )
}
