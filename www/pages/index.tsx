import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      username
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "loading...";

  console.log(data);

  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>
          <Link href="/[username]" as={`/${user.username}`}>
            <a>{user.username}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
