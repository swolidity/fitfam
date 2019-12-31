import React, { useCallback } from "react";
import { Flex, Box, Input, Button, Image } from "@chakra-ui/core";
import { FielderProvider, useForm } from "fielder";
import AddProfileSong from "../../components/AddProfileSong";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const USER_PROFILE_SONGS = gql`
  query UserProfileSongs($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      picture
      profile_songs {
        id
        artist
        title
        thumbnail
      }
    }
  }
`;

const ProfileSongPage: React.FunctionComponent = () => {
  const router = useRouter();
  const state = useForm();
  const { data, loading } = useQuery(USER_PROFILE_SONGS, {
    variables: {
      where: {
        username: router.query.username
      }
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Box p={6}>
      <FielderProvider value={state}>
        <Box>Profile Song</Box>

        <AddProfileSong />
      </FielderProvider>

      {data.user.profile_songs.map(song => (
        <Flex key={song.id} mb={2}>
          <Box mr={3}>
            <Image src={song.thumbnail} alt={song.title} height="80px" />
          </Box>

          <Box>{song.title}</Box>
        </Flex>
      ))}
    </Box>
  );
};

export default ProfileSongPage;
