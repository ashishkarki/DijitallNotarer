import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import customTheme from "../../theme";
import store from "@/store"; // Our Redux store

// Props to accept children
interface AppProviderProps {
  children: ReactNode;
}

// Create an Apollo Client instance
const apolloClient = new ApolloClient({
  uri: "http://localhost:8082/graphql",
  cache: new InMemoryCache(),
});

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
