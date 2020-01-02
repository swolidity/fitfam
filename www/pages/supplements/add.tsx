import React from "react";
import { Box } from "@chakra-ui/core";
import { useForm, FielderProvider } from "fielder";
import AddSupplement from "../../components/AddSupplement";

const AddSupplementPage: React.FC = () => {
  const state = useForm();

  return (
    <Box p={6}>
      Add Suppplement
      <FielderProvider value={state}>
        <AddSupplement />
      </FielderProvider>
    </Box>
  );
};

export default AddSupplementPage;
