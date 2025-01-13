import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const TenantFieldSelectionStep = ({ stepName, config, stepData, onApply }) => {
  const restoredValue = localStorage.getItem("formData")?.[stepName];
  const [value, setValue] = useState(stepData || restoredValue || "");

  // todo: validate input

  return (
    <Box>
      <h1>{config.title}</h1>
      <p>{config.description}</p>

      {config.elements.map((element) => {
        switch (element.type) {
          case "string-input": {
            return (
              <TextField
                key={element.title}
                variant="standard"
                id={config.name}
                label={config.title}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            );
          }
          case "button": {
            return (
              <Button
                key={element.title}
                variant="contained"
                onClick={() => onApply(stepName, value)}
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
  onApply: PropTypes.func,
};

export default TenantFieldSelectionStep;
