import { Grid2 } from "@mui/material";
import PropTypes from "prop-types";

const SizeWrapper = ({ config, element, ...other }) => {
  return (
    <Grid2
      size={{ xs: 12, md: config?.size || 6 }}
      sx={{
        // display: "flex",
        mt: 2,
        // alignContent: "end",
      }}
    >
      {element({ config, ...other })}
    </Grid2>
  );
};

SizeWrapper.propTypes = {
  config: PropTypes.shape({
    size: PropTypes.number,
  }),
  element: PropTypes.func.isRequired,
};

export default SizeWrapper;
