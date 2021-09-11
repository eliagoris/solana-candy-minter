import { ThemeProvider } from "theme-ui"
import "normalize.css"
import { AppProps } from "next/app"
import Router from "next/router"
import withGA from "next-ga"

import theme from "../styles/theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default withGA(process.env.NEXT_PUBLIC_GA_ID, Router)(MyApp)
