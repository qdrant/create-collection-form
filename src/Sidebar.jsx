import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { previewOutput } from "./prepareOutput.js";
import { CCFormSidebar } from "./ThemedComponents.jsx";
import { Typography } from "@mui/material";

const Sidebar = ({ formData, path, handleOutput }) => {
  const [outputData, setOutputData] = useState(null);

  useEffect(() => {
    if (formData) {
      if (handleOutput && typeof handleOutput === "function") {
        setOutputData(handleOutput(previewOutput(formData, path)));
      }
    }
  }, [path, formData, handleOutput]);

  return (
    <CCFormSidebar>
      {outputData ? (
        outputData
      ) : (
        <Typography
          variant="body2"
          sx={{ marginTop: "8px", fontStyle: "italic" }}
        >
          No data to preview
        </Typography>
      )}
    </CCFormSidebar>
  );
};

// prop types
Sidebar.propTypes = {
  formData: PropTypes.object.isRequired,
  path: PropTypes.array.isRequired,
  handleOutput: PropTypes.func,
};

export default Sidebar;
