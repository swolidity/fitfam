import React, { useCallback, useState } from "react";
import {
  Stack,
  Flex,
  Box,
  Textarea,
  Button,
  Input,
  Image
} from "@chakra-ui/core";
import { useField, useFormContext } from "fielder";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";

type UserEditProps = {
  user: any;
  preSignedUploadUrl: string;
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

const EditProfile: React.FC<UserEditProps> = ({ user, preSignedUploadUrl }) => {
  const [editProfile, { data: mutationData }] = useMutation(EDIT_PROFILE);

  const [pictureState, setPictureState] = useState("");

  const { fields } = useFormContext();
  const [pictureProps] = useField({
    name: "picture",
    initialValue: pictureState
  });

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
        picture: pictureProps.value,
        bio: fields.bio.value,
        instagram: fields.instagram.value
      }
    });
  }, [fields]);

  const onDrop = useCallback(async ([pendingImage]) => {
    // Upload the image to our pre-signed URL.
    const response = await fetch(
      new Request(preSignedUploadUrl, {
        method: "PUT",
        body: pendingImage,
        headers: new Headers({
          "Content-Type": "image/*",
          "x-amz-acl": "public-read"
        })
      })
    );

    if (response.status !== 200) {
      // The upload failed, so let's notify the caller.
      console.log("error");
      return;
    }
    // Let the caller know that the upload is done, so that it can send the URL
    // to the backend again, persisting it to the database.

    setPictureState(preSignedUploadUrl.split("?")[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log("preSignedUploadUrl", preSignedUploadUrl);
  console.log("pictureUrl", pictureState);

  return (
    <Stack spacing={3}>
      <Flex align="center">
        <Image
          src={pictureState ? pictureState : user.picture}
          rounded="full"
          ignoreFallback
          height="80px"
          mr={3}
        />
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </Flex>

      <Input placeholder="Bio" {...bioProps} />
      <Input placeholder="Instagram" {...instagramProps} />

      <Button onClick={handleSubmit}>Save</Button>
    </Stack>
  );
};

export default EditProfile;
