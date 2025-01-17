import DenseVectorConfiguration from "./DenseVectorConfiguration.jsx";
import Box from "@mui/material/Box";
import { elements } from "./flow.js";

const SimpleDenseEmbeddingStep = function ({
  stepName,
  config,
  stepData,
  onApply,
}) {
  const components = {
    "dense-vector-configuration": DenseVectorConfiguration,
  };
  const onChange = (key, value) => {
    // todo: new data is {stepName: {key: stepData, key2: value2}}
    const newValue = { ...stepData, [key]: value };
    onApply(stepName, newValue, null);
  };
  return (
    <Box>
      {config.elements.map((element) => {
        const Component = components[element.type];
        if (!Component) {
          console.log("Skipping element", element.type);
          return null;
        }
        return (
          <Component
            key={element.name}
            config={elements[element.type]}
            stepData={stepData}
            onChange={onChange}
          />
        );
      })}
    </Box>
  );
};

// props validation
SimpleDenseEmbeddingStep.propTypes = {};

export default SimpleDenseEmbeddingStep;
