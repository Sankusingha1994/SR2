import type { AppContext, AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "leaflet/dist/leaflet.css";



const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
    return (
        <>

    <QueryClientProvider client={queryClient}><Component {...pageProps} />
</QueryClientProvider>

            

        </>
    )
}
