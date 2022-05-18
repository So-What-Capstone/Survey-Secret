import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "x-jwt";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token, username) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND
    ? process.env.REACT_APP_BACKEND
    : "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return { headers: { ...headers, "x-jwt": localStorage.getItem(TOKEN) } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
