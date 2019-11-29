import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Box, Avatar, Text } from "@chakra-ui/core";

const GET_USER_PROFILE = gql`
  query userProfile($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      username
      email
      picture
    }
  }
`;

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      where: {
        username: "andy"
      }
    }
  });

  if (loading) return <div>loading...</div>;

  return (
    <Box p={6}>
      <Flex align="center">
        <Avatar
          src={data.user.picture}
          name={data.user.name}
          rounded="full"
          mr={4}
        />
        <Text>{data.user.username}</Text>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
