import React, { useCallback, useEffect } from "react";
import { Box, Input, Button } from "@chakra-ui/core";
import { useField, useFormContext } from "fielder";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_PROFILE_SONG = gql`
  mutation AddProfileSong(
    $url: String!
    $title: String!
    $artist: String!
    $provider: String!
    $thumbnail: String!
  ) {
    addProfileSong(
      url: $url
      title: $title
      artist: $artist
      provider: $provider
      thumbnail: $thumbnail
    ) {
      id
    }
  }
`;

const GET_OEMBED = gql`
  query GetOembed($url: String!) {
    oembed(url: $url) {
      title
      author_name
      thumbnail_url
      provider_name
    }
  }
`;

const AddProfileSong: React.FC = () => {
  const { fields, setFieldValue } = useFormContext();

  const [urlProps] = useField({
    name: "url",
    initialValue: ""
  });

  const [titleProps] = useField({
    name: "title",
    initialValue: ""
  });

  const [artistProps] = useField({
    name: "artist",
    initialValue: ""
  });

  const [addProfileSong, { data }] = useMutation(ADD_PROFILE_SONG);
  const [loadOembed, { data: oembedData }] = useLazyQuery(GET_OEMBED);

  useEffect(() => {
    if (oembedData) {
      setFieldValue({ name: "title", value: oembedData.oembed.title });
      setFieldValue({ name: "artist", value: oembedData.oembed.author_name });
    }
  }, [oembedData]);

  const handleSubmit = useCallback(() => {
    console.log(oembedData);
    addProfileSong({
      variables: {
        url: fields.url?.value,
        title: fields.title?.value,
        artist: fields.artist?.value,
        provider: oembedData.oembed?.provider_name,
        thumbnail: oembedData.oembed?.thumbnail_url
      }
    });
    alert("Submitted!");
  }, [fields, oembedData]);

  const handleURLChange = useCallback(async e => {
    loadOembed({
      variables: {
        url: e.target.value
      }
    });

    urlProps.onChange(e);
  }, []);

  return (
    <Box>
      <Input
        type="url"
        placeholder="URL"
        {...urlProps}
        mb={2}
        onChange={handleURLChange}
      />

      <Input placeholder="Title" {...titleProps} mb={2} />

      <Input placeholder="Artist Name" {...artistProps} mb={2} />

      <Button onClick={handleSubmit} mb={2}>
        Save
      </Button>
    </Box>
  );
};

export default AddProfileSong;
