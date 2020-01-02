import React, { useCallback } from "react";
import { Box, Stack, Input, Button } from "@chakra-ui/core";
import { useField, useFormContext } from "fielder";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

const ADD_SUPPLEMENT = gql`
  mutation AddSupplement($data: SupplementCreateInput!) {
    createOneSupplement(data: $data) {
      id
      name
      url
      image_url
      brand
      createdAt
      added_by {
        id
        name
        username
        picture
      }
    }
  }
`;

const AddSupplement: React.FC = () => {
  const [addSupplement, { data }] = useMutation(ADD_SUPPLEMENT);

  const loggedInUser = useLoggedInUser();

  const { fields } = useFormContext();

  const [nameProps] = useField({
    name: "name",
    initialValue: ""
  });

  const [urlProps] = useField({
    name: "url",
    initialValue: ""
  });

  const [imageUrlProps] = useField({
    name: "imageUrl",
    initialValue: ""
  });

  const [brandProps] = useField({
    name: "brand",
    initialValue: ""
  });

  const handleSubmit = useCallback(() => {
    addSupplement({
      variables: {
        data: {
          name: fields.name.value,
          url: fields.url.value,
          image_url: fields.imageUrl.value,
          brand: fields.brand.value,
          added_by: {
            connect: {
              id: loggedInUser.id
            }
          }
        }
      }
    });
  }, [fields]);

  return (
    <Stack spacing={2}>
      <Input placeholder="Name" {...nameProps} />
      <Input placeholder="URL" {...urlProps} />
      <Input placeholder="Image URL" {...imageUrlProps} />
      <Input placeholder="Brand" {...brandProps} />

      <Button onClick={handleSubmit}>Save</Button>
    </Stack>
  );
};

export default AddSupplement;
