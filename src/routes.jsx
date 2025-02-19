import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import CreateCollectionForm from "./CreateCollectionForm";
import EditCollection from "./EditCollection";
import { Box, Button } from "@mui/material";

const Navigation = () => (
  <Box sx={{ p: 2, display: "flex", gap: 2 }}>
    <Button component={Link} to="/" variant="outlined">
      Create Collection
    </Button>
    <Button component={Link} to="/edit" variant="outlined">
      Edit Collection
    </Button>
  </Box>
);

const AppRoutes = () => {
  const handleFinish = (data) => {
    console.log("Form finished with data:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<CreateCollectionForm onFinish={handleFinish} />} />
        <Route path="/edit" element={<EditCollection />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
