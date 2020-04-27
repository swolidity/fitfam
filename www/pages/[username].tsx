import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Box, Heading, Link, Spinner } from "@chakra-ui/core";
import UserProfile from "../components/UserProfile";
import NextLink from "next/link";

const GET_USER_PROFILE = gql`
  query userProfile($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      username
      bio
      email
      picture
      profile_songs(last: 1) {
        id
        artist
        title
        url
        thumbnail
      }
      bodyweights(last: 1) {
        id
        weight
        createdAt
      }
      workouts {
        id
        title
        slug
        createdAt
      }
      instagram
    }
  }
`;

const ProfilePage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      where: {
        username: "andy"
      }
    }
  });

  if (error) return <div>{error.message}</div>;

  if (loading)
    return (
      <Box p={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );

  return (
    <Box>
      <UserProfile user={data.user} />
    </Box>
  );
};

export default ProfilePage;
