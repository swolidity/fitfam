import React from "react";
import { Box } from "@chakra-ui/core";
import EditProfile from "../../components/EditProfile";
import { FielderProvider, useForm } from "fielder";

const EditPage: React.FC = () => {
  const state = useForm();

  return (
    <Box p={6}>
      Edit Profile
      <FielderProvider value={state}>
        <EditProfile />
      </FielderProvider>
    </Box>
  );
};

export default EditPage;
