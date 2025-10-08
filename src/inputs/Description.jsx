import PropTypes from "prop-types";
import { CCFormDescription } from "../ThemedComponents.jsx";
import { Typography } from "@mui/material";
import { ExternalLink } from "lucide-react";

const Description = ({ config, sx = {} }) => {
  let link = config?.link;
  let linkText = config?.linkText || "Learn more";

  return (
    <CCFormDescription elevation={0}>
      <Typography variant="caption" sx={{ ...sx }}>
        {/* here we can use `dangerouslySetInnerHTML` because the content source is trusted */}
        {/* but do not use it with untrusted content */}
        <span dangerouslySetInnerHTML={{ __html: config.description }} />
        &nbsp;
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            {linkText}
            <ExternalLink size={16} />
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
  sx: PropTypes.object,
};

export default Description;
