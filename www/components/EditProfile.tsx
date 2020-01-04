import React, { useCallback } from "react";
import { Box, Textarea, Button, Input } from "@chakra-ui/core";
import { useField, useFormContext } from "fielder";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

type UserEditProps = {
  user: any;
};

const EDIT_PROFILE = gql`
  mutation EditProfile($bio: String, $instagram: String) {
    editProfile(bio: $bio, instagram: $instagram) {
      id
      bio
      instagram
    }
  }
`;

const EditProfile: React.FC<UserEditProps> = ({ user }) => {
  const [editProfile, { data: mutationData }] = useMutation(EDIT_PROFILE);

  const { fields } = useFormContext();
  const [bioProps] = useField({
    name: "bio",
    initialValue: user.bio ? user.bio : ""
  });

  const [instagramProps] = useField({
    name: "instagram",
    initialValue: user.instagram ? user.instagram : ""
  });

  const handleSubmit = useCallback(() => {
    editProfile({
      variables: {
        bio: fields.bio.value,
        instagram: fields.instagram.value
      }
    });
  }, [fields]);

  return (
    <Box>
      <Input placeholder="Bio" mb={3} {...bioProps} />
      <Input placeholder="Instagram" mb={3} {...instagramProps} />

      <Button onClick={handleSubmit}>Save</Button>
    </Box>
  );
};

export default EditProfile;
