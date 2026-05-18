import { lazy, Suspense } from 'react'
import { useDevice } from './hooks/useDevice'

const DesktopApp = lazy(() => import('./desktop/App'))
const MobileApp = lazy(() => import('./mobile/App'))

function App() {
  const isMobile = useDevice()

  return (
    <Suspense fallback={null}>
      {isMobile ? <MobileApp /> : <DesktopApp />}
    </Suspense>
  )
}

export default App
