import React from "react";
import PropTypes from "prop-types";
import { CCFormDescription } from "../ThemedComponents.jsx";
import { Typography } from "@mui/material";

const Description = ({ config, stepData, onChange }) => {
  // todo: add labelId and id
  return (
    <CCFormDescription elevation={0}>
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
