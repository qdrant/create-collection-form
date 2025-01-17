import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Dropdown, NumberWithSuggestions } from "./Inputs.jsx";
import { Typography } from "@mui/material";

const DenseVectorConfiguration = function ({ config, stepData, onChange }) {
  const components = {
    "number-with-suggestions": NumberWithSuggestions,
    dropdown: Dropdown,
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
              defaultValue={stepData}
              onChange={onChange}
            />
          </Box>
        );
      })}
    </Box>
  );
};

// todo: decide on default stepData alternative name

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
  stepData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default DenseVectorConfiguration;
