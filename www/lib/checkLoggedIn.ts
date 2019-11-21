import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getLoggedInUser {
          user {
            id
            name
            email
            picture
          }
        }
      `
    })
    .then(({ data }) => {
      return { data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: null };
    });
