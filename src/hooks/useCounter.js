import { useState, useEffect, useRef } from 'react'

export function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const observerRef = useRef(null)
  const elementRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const animateCounter = () => {
      const start = 0
      const increment = target / (duration / 16) // 60fps
      let current = start

      timerRef.current = setInterval(() => {
        current += increment
        setCount(Math.floor(current))

        if (current >= target) {
          setCount(target)
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
        }
      }, 16)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true)
            animateCounter()
          } else if (!entry.isIntersecting) {
            setCount(0)
            setIsAnimating(false)
            if (timerRef.current) {
              clearInterval(timerRef.current)
              timerRef.current = null
            }
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    observer.observe(element)
    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isAnimating, target, duration])

  return { count, elementRef }
}
