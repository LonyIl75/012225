import {HeroUIProvider as _NextUIProvider} from '@heroui/react'

function NextUIProvider({children}: { children: React.ReactNode }) {
  return (
    <_NextUIProvider>
      {children}
    </_NextUIProvider>
  )
}

export default NextUIProvider