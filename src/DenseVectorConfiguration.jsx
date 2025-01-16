import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { NumberWithSuggestions } from "./Inputs.jsx";
import { Typography } from "@mui/material";

const DenseVectorConfiguration = function ({ config, value, onChange }) {
  const components = {
    "number-with-suggestions": NumberWithSuggestions,
  };

  return (
    <Box>
      {config.map((element) => {
        const Component = components[element.type];
        if (!Component) {
          console.log("Skipping element", element.type);
          return null;
        }
        return (
          <Box key={element.title}>
            <Typography variant="h6">{element.title}</Typography>
            <Component
              config={element}
              defaultValue={value}
              onChange={onChange}
            />
          </Box>
        );
      })}
    </Box>
  );
};

// todo: decide on default value alternative name

// props validation
DenseVectorConfiguration.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      suggestions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired,
        }),
      ),
    }),
  ).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default DenseVectorConfiguration;
