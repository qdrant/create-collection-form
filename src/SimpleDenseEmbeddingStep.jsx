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
  const onChange = (e) => {
    onApply(stepName, e.target.value, null);
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
            value={stepData}
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
