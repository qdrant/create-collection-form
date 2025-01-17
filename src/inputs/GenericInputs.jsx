import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import components from "./collection.jsx";

const GenericInputs = function ({ config, stepData, onChange }) {

  return (
    <Box>
      {config.elements.map((element) => {

        let configOnChange = function (value) {
          let newData = {
            ...stepData,
            [element.name]: value,
          }
          onChange(newData);
        };

        const Component = components[element.type];
        if (!Component) {
          console.log("Skipping element", element.type);
          return null;
        }
        let elementData = stepData && stepData[element.name];
        if (elementData === undefined) {
          elementData = element.default;
        }

        return (
          <Box key={element.title}>
            <Typography variant="h6">{element.title}</Typography>
            <Component
              config={element}
              stepData={elementData}
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
GenericInputs.propTypes = {
  config: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      elements: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
      })),
    }
  ).isRequired,
  stepData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default GenericInputs;
