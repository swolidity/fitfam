import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Box, Heading } from "@chakra-ui/core";
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
        logs(orderBy: { createdAt: asc }) {
          id
          exercise {
            id
            name
          }
          weight
          reps
          createdAt
        }
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
    <Box p={6} display={{ md: "flex" }}>
      <Box width={["100%", "100%", "25%", "25%"]} mr={6}>
        <UserProfileSidebar user={data.user} />
      </Box>

      <Box width={["100%", "100%", "75%", "75%"]}>
        <Heading size="md" mb={3}>
          Workouts
        </Heading>
        {data.user.workouts.map(workout => (
          <div key={workout.id}>
            <div>{workout.title}</div>

            {workout.logs.map(log => (
              <div key={log.id}>
                <div>{log.exercise.name}</div>
                <div>
                  {log.weight} lbs x {log.reps}
                </div>
              </div>
            ))}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
