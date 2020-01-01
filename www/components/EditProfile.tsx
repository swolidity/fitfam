import React, { useCallback } from "react";
import { Box, Textarea, Button, Input } from "@chakra-ui/core";
import { useField, useFormContext } from "fielder";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const EDIT_BIO = gql`
  mutation EditBio($bio: String!) {
    editBio(bio: $bio) {
      id
      bio
    }
  }
`;

const EditProfile: React.FC = () => {
  const [editBio, { data }] = useMutation(EDIT_BIO);

  const { fields } = useFormContext();
  const [bioProps] = useField({
    name: "bio",
    initialValue: ""
  });

  const handleSubmit = useCallback(() => {
    editBio({
      variables: {
        bio: fields.bio.value
      }
    });
  }, [fields]);

  return (
    <Box>
      <Input placeholder="Bio" mb={3} {...bioProps} />

      <Button onClick={handleSubmit}>Save</Button>
    </Box>
  );
};

export default EditProfile;
