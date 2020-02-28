import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const USER_SUPPLEMENTS = gql`
  query UserSupplements($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      picture
      supplement_stack {
        id
        supplements {
          id
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const UserSupplmentsPage = () => {
  return <div>Supps</div>;
};

export default UserSupplmentsPage;
