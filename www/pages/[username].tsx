import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Box } from "@chakra-ui/core";
import UserProfileSidebar from "../components/UserProfileSidebar";

const GET_USER_PROFILE = gql`
  query userProfile($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      username
      bio
      email
      picture
      bodyweights(last: 1) {
        id
        weight
        createdAt
      }
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
    <Flex p={6}>
      <Box width={["100%", "25%"]}>
        <UserProfileSidebar user={data.user} />
      </Box>

      <Box width={["100%", "75%"]}>Workouts</Box>
    </Flex>
  );
};

export default ProfilePage;
