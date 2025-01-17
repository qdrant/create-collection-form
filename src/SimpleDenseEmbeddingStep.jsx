import DenseVectorConfiguration from "./DenseVectorConfiguration.jsx";
import Box from "@mui/material/Box";
import { elements } from "./flow.js";
import { StringInput } from "./Inputs.jsx";
import { Button } from "@mui/material";
import { useState } from "react";

const SimpleDenseEmbeddingStep = function ({
  stepName,
  config,
  stepData,
  onApply,
}) {
  const [value, setValue] = useState(stepData || {});
  const components = {
    "dense-vector-configuration": DenseVectorConfiguration,
    "string-input": StringInput,
  };
  const onChange = (key, value) => {
    const newValue = { ...stepData, [key]: value };
    setValue(newValue);
    onApply(stepName, newValue, null);
  };
  return (
    <Box>
      {config.elements.map((element) => {
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
                config={elements[element.type] || element}
                stepData={stepData}
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
SimpleDenseEmbeddingStep.propTypes = {};

export default SimpleDenseEmbeddingStep;
