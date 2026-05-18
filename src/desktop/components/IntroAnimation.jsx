import { useEffect, useState } from 'react'

const FONT = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 500,
  letterSpacing: '0.02em',
  color: '#ffffff',
  whiteSpace: 'nowrap',
}

const NAV_TOP    = 34   // 68px header / 2
const NAV_LEFT   = 'clamp(24px, 4vw, 64px)'
const LOGO_SIZE  = '20px'
const INTRO_SIZE = 'clamp(48px, 7vw, 72px)'
const EASING     = 'cubic-bezier(0.76, 0, 0.24, 1)'

export default function IntroAnimation({ onComplete }) {
  // showing → moving → fading → done
  const [phase, setPhase] = useState('showing')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('moving'),  1600)
    const t2 = setTimeout(() => {
      setPhase('fading')
      onComplete?.()
    }, 1600 + 880)
    const t3 = setTimeout(() => setPhase('done'), 1600 + 880 + 620)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  const showing = phase === 'showing'
  const moving  = phase === 'moving'
  const fading  = phase === 'fading'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none' }}>
      {/* Black overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0a0a0a',
        opacity: fading ? 0 : 1,
        transition: fading ? 'opacity 0.62s ease' : 'none',
      }} />

      {/* Animated "Santiago Dev" */}
      <span style={{
        ...FONT,
        position: 'fixed',
        zIndex: 201,
        // Position
        top:       showing ? '50%'       : `${NAV_TOP}px`,
        left:      showing ? '50%'       : NAV_LEFT,
        transform: showing ? 'translate(-50%, -50%)' : 'translateY(-50%)',
        // Size
        fontSize: showing ? INTRO_SIZE : LOGO_SIZE,
        // Opacity
        opacity: fading ? 0 : 1,
        // Transitions
        transition: moving
          ? `top .88s ${EASING}, left .88s ${EASING}, font-size .88s ${EASING}, transform .88s ${EASING}`
          : fading
            ? 'opacity 0.62s ease'
            : 'none',
        // Entrance animation (blurIn defined in index.css)
        animation: showing ? 'blurIn 0.75s ease forwards' : 'none',
      }}>
        Santiago Dev
      </span>
    </div>
  )
}
