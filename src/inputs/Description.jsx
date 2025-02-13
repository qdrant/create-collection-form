import PropTypes from "prop-types";
import { CCFormDescription } from "../ThemedComponents.jsx";
import { Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Description = ({ config, stepData, onChange }) => {
  let link = config?.link;
  let linkText = config?.linkText || "Learn more";

  return (
    <CCFormDescription elevation={0}>
      <InfoOutlined fontSize="1rem" sx={{ mr: 1, mt: 0.3 }} />
      <Typography variant="caption" sx={{ whiteSpace: "pre-line" }}>
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
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
  stepData: PropTypes.string,
  onChange: PropTypes.func,
};

export default Description;
