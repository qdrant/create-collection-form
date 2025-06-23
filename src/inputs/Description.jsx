import PropTypes from "prop-types";
import { CCFormDescription } from "../ThemedComponents.jsx";
import { Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Description = ({ config }) => {
  let link = config?.link;
  let linkText = config?.linkText || "Learn more";

  return (
    <CCFormDescription elevation={0}>
      <Typography
        variant="caption"
        sx={{ whiteSpace: "pre-line", fontSize: "0.9rem", fontWeight: 500 }}
      >
        {config.description}&nbsp;
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            {linkText}
            <OpenInNewIcon fontSize="1rem" sx={{ mx: 1, mb: -0.4 }} />
          </a>
        )}
      </Typography>
    </CCFormDescription>
  );
};

// props validation
Description.propTypes = {
  config: PropTypes.shape({
    link: PropTypes.string,
    linkText: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Description;
