import { useState, useEffect } from 'react'

export function useTypewriter(texts, typingSpeed = 200, deletingSpeed = 40, pauseTime = 2500) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentText = texts[currentIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          // Pausa antes de borrar
          setIsDeleting(true)
        }
      } else {
        // Borrando
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          // Cambiar al siguiente texto
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % texts.length)
          setCharIndex(0)
          setDisplayText('')
        }
      }
    }, isDeleting ? deletingSpeed : (charIndex === currentText.length ? pauseTime : typingSpeed))

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}
