import React from "react";
import App from "next/app";
import { withApollo } from "../lib/apollo";
import Layout from "../components/Layout";
import checkLoggedIn from "../lib/checkLoggedIn";
import { LoggedInUserContext } from "../hooks/useLoggedInUser";

class MyApp extends App<any> {
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    const loggedInUser = await checkLoggedIn(appContext.apolloClient);

    return { ...appProps, loggedInUser };
  }

  render() {
    const { Component, pageProps, loggedInUser } = this.props;
    return (
      <LoggedInUserContext.Provider value={loggedInUser}>
        <Layout loggedInUser={loggedInUser}>
          <Component {...pageProps} />
        </Layout>
      </LoggedInUserContext.Provider>
    );
  }
}

export default withApollo(MyApp);
