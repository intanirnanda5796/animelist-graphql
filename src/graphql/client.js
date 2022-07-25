import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_ANILIST,
  cache: new InMemoryCache()
});

const ApolloWrapper = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
