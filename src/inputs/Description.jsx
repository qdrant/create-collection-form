import React from "react";
import PropTypes from "prop-types";
import { CCFormDescription } from "../ThemedComponents.jsx";
import { Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const Description = ({ config, stepData, onChange }) => {

  let link = config?.link;
  let linkText = config?.linkText || "Learn more";

  return (
    <CCFormDescription elevation={0}>
      <InfoOutlined fontSize="1rem" sx={{ mr: 1, mb: 0.5 }} />
      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>{config.description}</Typography>
      {link && (
        <>
          <OpenInNewIcon fontSize="1rem" sx={{ mr: 1, mb: 0.5 }} />
          <Typography variant="body2">
            <a href={link} target="_blank" rel="noreferrer">
              {linkText}
            </a>
          </Typography>
        </>
      )}
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
