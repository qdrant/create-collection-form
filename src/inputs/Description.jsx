import React from "react";
import PropTypes from "prop-types";
import { CCFormDescription } from "../ThemedComponents.jsx";
import { Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

const Description = ({ config, stepData, onChange }) => {
  return (
    <CCFormDescription elevation={0}>
      <InfoOutlined fontSize="1rem" sx={{ mr: 1, mb: 0.5 }} />
      <Typography variant="body2">{config.description}</Typography>
    </CCFormDescription>
  );
};

// props validation
Description.propTypes = {
  config: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  stepData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Description;
