import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import components from "./collection.jsx";
import Card from "@mui/material/Card";

const GenericInputs = function ({ config, stepData, onChange }) {
  console.log(config.elements);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "start",
        gap: 2,
      }}
    >
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
            <Box
              key={element.title}
              sx={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "49%",
                flexShrink: 1,
                flexGrow: 1,
                justifyContent: "space-around",
                mt: 2,
              }}
            >
              <Typography variant="h6">{element.title}</Typography>
              <Component
                config={element}
                stepData={elementData}
                onChange={configOnChange}
              />
            </Box>
          );
        }),
      )}
    </Box>
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
