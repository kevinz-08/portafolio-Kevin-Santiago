import { useState, useEffect, useRef } from 'react'

export function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)
  const timerRef = useRef(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const startCounter = () => {
      if (isAnimatingRef.current) return

      isAnimatingRef.current = true
      let current = 0
      const increment = target / (duration / 16)

      timerRef.current = setInterval(() => {
        current += increment

        if (current >= target) {
          setCount(target)
          clearInterval(timerRef.current)
          timerRef.current = null
        } else {
          setCount(Math.ceil(current))
        }
      }, 16)
    }

    const resetCounter = () => {
      isAnimatingRef.current = false
      setCount(0)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter()
        } else {
          resetCounter()
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [target, duration])

  return { count, elementRef }
}
