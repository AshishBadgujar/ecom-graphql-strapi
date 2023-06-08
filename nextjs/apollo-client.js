import { ApolloClient, InMemoryCache } from "@apollo/client";

export const BACKEND_URL = "http://localhost:1337"

const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
});

export default client;