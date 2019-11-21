import React from "react";
import App from "next/app";
import { withApollo } from "../lib/apollo";
import Layout from "../components/Layout";
import checkLoggedIn from "../lib/checkLoggedIn";

class MyApp extends App<any> {
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    const loggedInUser = await checkLoggedIn(appContext.apolloClient);

    return { ...appProps, loggedInUser };
  }

  render() {
    console.log("loggedInUser", this.props.loggedInUser);

    if (!this.props.loggedInUser) {
      return <div>logging in...</div>;
    }

    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <h2>{this.props.loggedInUser.name}</h2>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default withApollo(MyApp);
