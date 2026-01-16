import { useEffect, useState } from 'react'

export function useParallax(enabled = true) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled])

  const getParallaxStyle = (speed = 0.4, maxOpacity = 1) => {
    if (!enabled || window.innerWidth <= 768) {
      return {
        transform: 'translateY(0)',
        opacity: 1
      }
    }

    return {
      transform: `translateY(${scrollY * speed}px)`,
      opacity: Math.max(0, maxOpacity - scrollY / 400)
    }
  }

  return { scrollY, getParallaxStyle }
}
