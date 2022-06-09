import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "x-jwt";
const USERNAME = "username";
export const tokenVar = makeVar(localStorage.getItem(TOKEN));
export const usernameVar = makeVar(localStorage.getItem(USERNAME));

function getPayload(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function verifyToken() {
  try {
    const token = localStorage.getItem(TOKEN);
    const decoded = getPayload(token);
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch (err) {
    return false;
  }
}

export const logUserIn = (token, username) => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USERNAME, username);
  tokenVar(token);
  usernameVar(username);
};

export const logUserOut = (reload = true) => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USERNAME);
  tokenVar(undefined);
  usernameVar(undefined);
  if (reload) {
    window.location.reload();
  }
};

//"http://localhost:5000/graphql"
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
