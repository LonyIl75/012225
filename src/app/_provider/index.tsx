import NextUIProvider from './base/NextUIProvider'

function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

export default Providers