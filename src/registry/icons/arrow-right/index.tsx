"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimate } from "motion/react"

export type ArrowRightVariant = "default" | "path" | "path-reverse"
export interface ArrowRightIconProps {
  size?: number
  color?: string
  strokeWidth?: number
  loop?: boolean
  variant?: ArrowRightVariant
  animateOnHover?: boolean
  animateOnClick?: boolean
  autoPlay?: boolean
  reverse?: boolean
  duration?: number
  className?: string
}

type AnimationOptions = {
  reverse: boolean
  duration: number
}

type AnimationFn = (
  animate: ReturnType<typeof useAnimate>[1],
  options: AnimationOptions
) => Promise<void>

const animations: Record<ArrowRightVariant, AnimationFn> = {
  default: async (animate, { reverse, duration }) => {
    const dir = reverse ? -1 : 1

    animate('[data-path="line"]', { x: dir * 2 }, { duration: duration * 0.4 })

    await animate(
      '[data-path="head"]',
      { x: dir * 4 },
      { duration: duration * 0.4 }
    )

    animate('[data-path="line"]', { x: 0 }, { duration: duration * 0.4 })

    await animate('[data-path="head"]', { x: 0 }, { duration: duration * 0.4 })
  },

  path: async (animate, { duration }) => {
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
  },

  "path-reverse": async (animate, { duration }) => {
    await Promise.all([
      animate(
        '[data-path="line"]',
        { pathLength: [1, 0, 1] },
        { duration, ease: "easeInOut" }
      ),
      animate(
        '[data-path="head"]',
        { pathLength: [1, 0, 1] },
        { duration, delay: duration * 0.3, ease: "easeInOut" }
      ),
    ])
  },
}

export const ArrowRightIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  variant = "default",
  animateOnHover = true,
  animateOnClick = false,
  autoPlay = false,
  reverse = false,
  loop = false,
  duration = 0.5,
  className,
}: ArrowRightIconProps) => {
  const [scope, animate] = useAnimate()
  const isAnimating = useRef(false)

  const play = async () => {
    if (isAnimating.current) return
    isAnimating.current = true

    try {
      if (loop) {
        while (isAnimating.current) {
          await animations[variant](animate, { reverse, duration })
        }
      } else {
        await animations[variant](animate, { reverse, duration })
      }
    } finally {
      isAnimating.current = false
    }
  }

  const stop = () => {
    isAnimating.current = false
  }

  useEffect(() => {
    if (autoPlay) play()
  }, [autoPlay])

  useEffect(() => {
    return () => {
      isAnimating.current = false
    }
  }, [])

  const eventProps = {
    ...(animateOnHover && {
      onHoverStart: play,
      onHoverEnd: stop,
    }),
    ...(animateOnClick && {
      onTap: play,
    }),
  }

  return (
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
      className={className}
      style={{
        cursor: animateOnClick ? "pointer" : "default",
      }}
      {...eventProps}
    >
      <motion.path data-path="line" d="M5 12h14" />
      <motion.path data-path="head" d="m12 5 7 7-7 7" />
    </motion.svg>
  )
}
