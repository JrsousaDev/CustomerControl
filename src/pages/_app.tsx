import { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/Global'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
