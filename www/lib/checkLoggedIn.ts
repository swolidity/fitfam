import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query GetLoggedInUser {
          getLoggedInUser {
            id
            name
            email
            picture
          }
        }
      `
    })
    .then(({ data }) => {
      return data.getLoggedInUser;
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: null };
    });
