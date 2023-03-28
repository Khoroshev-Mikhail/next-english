import '../styles/globals.css';
import 'tailwindcss/tailwind.css'
import { SWRConfig } from "swr/_internal";
import { SessionProvider, useSession } from "next-auth/react"
import Layout from 'components/layout/Layout';
import { Spinner } from 'flowbite-react';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
        <SWRConfig value={{
          keepPreviousData: true,
          revalidateOnFocus: false,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
            <Layout>
            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}
            </Layout>
        </SWRConfig>
    </SessionProvider>
  );
};
function Auth({ children }) {
  const { status } = useSession({ required: true })
  if (status === "loading") {
    return (
      <div><Spinner /></div>
    )
  }
  return children
}
export default App;
