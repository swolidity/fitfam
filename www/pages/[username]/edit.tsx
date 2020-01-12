import React from "react";
import { Box, Spinner, Heading } from "@chakra-ui/core";
import EditProfile from "../../components/EditProfile";
import { FielderProvider, useForm } from "fielder";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";

const GET_USER_EDIT = gql`
  query getUserEdit($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      username
      picture
      bio
      instagram
    }
    getPresignedUploadUrl(directory: "andy")
  }
`;

const EditPage: React.FC = () => {
  const loggedInUser = useLoggedInUser();

  const { data, loading, error } = useQuery(GET_USER_EDIT, {
    variables: {
      where: {
        id: loggedInUser.id
      }
    }
  });

  const state = useForm();

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
    <Box p={6}>
      <Heading mb={6}>Edit Profile</Heading>
      <FielderProvider value={state}>
        <EditProfile
          user={data.user}
          preSignedUploadUrl={data.getPresignedUploadUrl}
        />
      </FielderProvider>
    </Box>
  );
};

export default EditPage;
