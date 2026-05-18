import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0, rootMargin: '-30% 0px -30% 0px' }
    )

    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [sectionIds])

  return activeSection
}
