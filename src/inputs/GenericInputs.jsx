import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Grid2, Typography } from "@mui/material";
import components from "./collection.jsx";

const GenericInputs = function ({ config, stepData, onChange }) {
  console.log(config.elements);
  return (
    <Grid2 container spacing={2}>
      {config.groups.map((group) =>
        group.elements.map((element) => {
          let configOnChange = function (value) {
            let newData = {
              ...stepData,
              [element.name]: value,
            };
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
            <Grid2
              item
              size={4} // todo: make it configurable
              key={element.title}
              sx={{
                mt: 2,
                // alignContent: "end",
              }}
            >
              <Typography variant="h6">{element.title}</Typography>
              <Component
                config={element}
                stepData={elementData}
                onChange={configOnChange}
              />
            </Grid2>
          );
        }),
      )}
    </Grid2>
  );
};

// todo: decide on default stepData alternative name

// props validation
GenericInputs.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        elements: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }),
        ),
      }),
    ),
  }).isRequired,
  stepData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default GenericInputs;
