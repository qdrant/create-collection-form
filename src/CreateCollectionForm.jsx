import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { steps } from "./flow.js";
import CardsSelect from "./CardsSelect.jsx";
import TenantFieldSelectionStep from "./steps/TenantFieldSelectionStep.jsx";
import SimpleDenseEmbeddingStep from "./steps/SimpleDenseEmbeddingStep.jsx";
import SimpleHybridEmbeddingStep from "./steps/SimpleHybridEmbeddingStep.jsx";

export function CreateCollectionForm() {
  const firstStepName = "use-case-step";

  const [path, setPath] = useState(() => {
    return JSON.parse(localStorage.getItem("path")) || [firstStepName];
  });
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem("formData")) || {};
  });

  const updatePath = (prevStep, nextStep) => {
    const prevStepIndex = path.indexOf(prevStep);
    const newPath = path.slice(0, prevStepIndex + 1);
    newPath.push(nextStep);
    setPath(newPath);
  };

  const handleStepApply = (stepName, data, nextStep) => {
    setFormData((prev) => ({ ...prev, [stepName]: data }));
    if (!nextStep) {
      return;
    }
    updatePath(stepName, nextStep);
  };

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
    if (path.length > 0) {
      localStorage.setItem("path", JSON.stringify(path));
    }
  }, [path, formData]);

  const stepsComponents = {
    "use-case-step": CardsSelect,
    "tenant-field-selection-step": TenantFieldSelectionStep,
    "templates-selection-step": CardsSelect,
    "simple-dense-embedding-step": SimpleDenseEmbeddingStep,
    "simple-hybrid-embedding-step": SimpleHybridEmbeddingStep,
  };

  return (
    <Box>
      {path.map((step) => {
        const StepComponent = stepsComponents[step];
        if (!StepComponent) {
          return null;
        }

        const restoredValue = localStorage.getItem("formData")?.[step];
        const stepData = formData[step] || restoredValue;

        return (
          <StepComponent
            key={step}
            stepName={step}
            config={steps[step]}
            stepData={stepData}
            onApply={handleStepApply}
          />
        );
      })}
    </Box>
  );
}

// props validation
CreateCollectionForm.propTypes = {};

export default CreateCollectionForm;
