import { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/Global';
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Hydrate>
  </QueryClientProvider>
  )
}

export default MyApp;
