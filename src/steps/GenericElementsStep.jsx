import Box from "@mui/material/Box";
import { elements } from "../flow.js";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import components from "../inputs/collection.jsx";

const GenericElementsStep = function ({ stepName, config, stepData, onApply }) {
  const value = stepData || {};

  return (
    <Box>
      <Typography variant="h4">{config.title}</Typography>
      {config.elements.map((element) => {
        const onChange = (value) => {
          const newValue = { ...stepData, [element.name]: value };
          onApply(stepName, newValue, null);
        };
        switch (element.type) {
          case "button": {
            return (
              <Button
                key={element.title}
                variant="contained"
                onClick={() =>
                  onApply(stepName, value, element["on-click"]["continue-step"])
                }
              >
                {element.title}
              </Button>
            );
          }
          default: {
            const Component = components[element.type];
            if (!Component) {
              console.log("Skipping element", element.type);
              return null;
            }
            return (
              <Component
                key={element.name}
                config={{
                  ...(elements[element.type] || {}),
                  ...element,
                }}
                stepData={value[element.name]}
                onChange={onChange}
              />
            );
          }
        }
      })}
    </Box>
  );
};

// props validation
GenericElementsStep.propTypes = {
  stepName: PropTypes.string.isRequired,
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        title: PropTypes.string,
      }),
    ),
  }),
  stepData: PropTypes.any,
  onApply: PropTypes.func.isRequired,
};

export default GenericElementsStep;
