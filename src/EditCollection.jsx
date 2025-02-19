import React from "react";
import EditCollectionForm from "./EditCollectionForm";
import { Box } from "@mui/material";

const EditCollection = () => {
  const handleFinish = (updatedConfig) => {
    console.log("Updated configuration:", updatedConfig);
    alert(JSON.stringify(updatedConfig, null, 2));
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <EditCollectionForm onFinish={handleFinish} />
    </Box>
  );
};

export default EditCollection;
