import '../styles/globals.css';
import 'tailwindcss/tailwind.css'
import { SWRConfig } from "swr/_internal";
import { SessionProvider, useSession } from "next-auth/react"
import Layout from 'components/layout/Layout';
import { Spinner } from 'flowbite-react';
import useSWR from 'swr'
import { Vocabulary_Word } from 'lib/errors';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const { data, error, isLoading } = useSWR<{ name: string, email: string }>(session?.user?.id ? `/api/user/${session.user.id}` : null)
  const { data: vocabulary} = useSWR<Vocabulary_Word[]>(`/api/user/vocabulary`)
  const { data: english } = useSWR(`/api/user/vocabulary/english/`)
  const { data: russian } = useSWR(`/api/user/vocabulary/russian/`)
  const { data: auding } = useSWR(`/api/user/vocabulary/auding/`)
  const { data: speaking } = useSWR(`/api/user/vocabulary/speaking/`)
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
