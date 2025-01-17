import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Dropdown } from "../Inputs.jsx";
import { Typography } from "@mui/material";
import { NumberWithSuggestions } from "./NumberWithSuggestions.jsx";


const DenseVectorConfiguration = function ({ config, stepData, onChange }) {
  const components = {
    "number-with-suggestions": NumberWithSuggestions,
    dropdown: Dropdown,
  };

  let configOnChange = function (name, value) {
    let newData = {
      ...(stepData && stepData[config.name]),
      [name]: value,
    }
    onChange(config.name, newData);
  };

  return (
    <Box>
      {config.elements.map((element) => {
        const Component = components[element.type];
        if (!Component) {
          console.log("Skipping element", element.type);
          return null;
        }
        let elementData = stepData && stepData[config.name] && stepData[config.name][element.name];
        return (
          <Box key={element.title}>
            <Typography variant="h6">{element.title}</Typography>
            <Component
              config={element}
              defaultValue={elementData || element.default}
              onChange={configOnChange}
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
  config: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      elements: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        suggestions: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
          }),
        ),
      })),
    }
  ).isRequired,
  stepData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default DenseVectorConfiguration;
