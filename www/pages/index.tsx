import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "loading...";

  console.log(data);
  console.log(error);

  return (
    <div>
      <Link href="/[username]" as={`/andy`}>
        <a>Andy</a>
      </Link>
    </div>
  );
};

export default Home;
