import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, threshold = 0.6) {
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
      { threshold }
    )

    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [sectionIds, threshold])

  return activeSection
}
