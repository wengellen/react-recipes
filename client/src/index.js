import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/withSession";
import Navbar from "./components/Navbar";
import Search from "./components/Recipe/Search";
import AddRecipe from "./components/Recipe/AddRecipe";
import Profile from "./components/Profile/Profile";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("networkError", networkError);
      if (networkError.statusCode === 401) {
        localStorage.removeItem("token");
      }
    }
  },
});

const Root = ({ refetch, session }) => {
  return (
    <Router>
      <Fragment>
        <Navbar session={session} />
        <Switch>
          <Route path="/" component={App} exact />
          <Route path="/search" component={Search} />
          <Route path="/signin" render={() => <Signin refetch={refetch} />} />
          <Route path="/signup" render={() => <Signup refetch={refetch} />} />
          <Route path="/recipe/add" component={AddRecipe} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    </Router>
  );
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RootWithSession />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
