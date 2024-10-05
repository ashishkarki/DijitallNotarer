import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import AppProvider from "@/components/AppProvider";

// Create an Apollo Client instance
const apolloClient = new ApolloClient({
  uri: "http://localhost:8082/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  // also, wrap our overall app in ApolloProvider
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
