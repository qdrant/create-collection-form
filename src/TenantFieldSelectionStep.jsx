import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const TenantFieldSelectionStep = ({ stepName, config, stepData, onApply }) => {
  const [value, setValue] = useState(stepData || {});

  // todo: validate input

  return (
    <Box>
      <h1>{config.title}</h1>
      <p>{config.description}</p>

      {config.elements.map((element) => {
        switch (element.type) {
          case "string-input": {
            return (
              <TextField // 
                key={element.title}
                variant="standard"
                id={element.name}
                label={element.title}
                value={value[element.name] || element.default || ""}
                onChange={(e) => {
                  setValue({[element.name]: e.target.value});
                  onApply(stepName, value, null);
                }}
              />
            );
          }
          case "button": {
            return (
              <Button
                key={element.title}
                variant="contained"
                onClick={() => onApply(stepName, value, element["on-click"]["continue-step"])}
              >
                {element.title}
              </Button>
            );
          }
          default: {
            return null;
          }
        }
      })}
    </Box>
  );
};

// props validation
TenantFieldSelectionStep.propTypes = {
  stepName: PropTypes.string.isRequired,
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string,
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

export default TenantFieldSelectionStep;
