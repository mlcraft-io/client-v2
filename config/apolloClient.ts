import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const HASURA_GRAPHQL_ENDPOINT = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
const HASURA_WS_ENDPOINT = import.meta.env.VITE_HASURA_WS_ENDPOINT;

const httpLink = new HttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: HASURA_WS_ENDPOINT,
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const createApolloClient = () => {
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return client;
};

export default createApolloClient;
