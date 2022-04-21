import { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/Global';
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../contexts/AuthContext';
import { LayoutProvider } from '../contexts/LayoutContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
  <AuthProvider>
    <LayoutProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <div style={{position: 'absolute', top: '0', right: '0'}}><ToastContainer /></div>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </LayoutProvider>
  </AuthProvider>
  )
}

export default MyApp;
