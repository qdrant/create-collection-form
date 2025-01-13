import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { steps } from "./flow.js";
import CardsSelect from "./CardsSelect.jsx";
import TenantFieldSelectionStep from "./TenantFieldSelectionStep.jsx";

export function CreateCollectionForm() {
  const stepsNames = Object.keys(steps);
  const firstStepName = stepsNames[0];
  const [currentStep, setCurrentStep] = useState(() => {
    return JSON.parse(localStorage.getItem("currentStep")) || firstStepName;
  });

  const [path, setPath] = useState(() => {
    return JSON.parse(localStorage.getItem("path")) || [firstStepName];
  });
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem("formData")) || {};
  });

  const updatePath = (prevStep, currentStep) => {
    const prevStepIndex = path.indexOf(prevStep);
    const newPath = path.slice(0, prevStepIndex + 1);
    newPath.push(currentStep);
    setPath(newPath);
  };

  const handleStepApply = (stepName, data, nextStep) => {
    setFormData((prev) => ({ ...prev, [stepName]: data }));
    if (nextStep) {
      updatePath(stepName, nextStep);
      setCurrentStep(nextStep);
    } else {
      const nextStep = stepsNames.indexOf(stepName) + 1;
      updatePath(stepName, stepsNames[nextStep]);
      setCurrentStep(stepsNames[nextStep]);
    }
  };

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
    if (currentStep) {
      localStorage.setItem("currentStep", JSON.stringify(currentStep));
    }
    if (path.length > 0) {
      localStorage.setItem("path", JSON.stringify(path));
    }
    console.log("path", path);
  }, [currentStep, path, formData]);

  const stepsComponents = {
    "use-case-step": CardsSelect,
    "tenant-field-selection-step": TenantFieldSelectionStep,
    "templates-selection-step": CardsSelect,
  };

  return (
    <Box>
      {path.map((step) => {
        const StepComponent = stepsComponents[step];
        if (!StepComponent) {
          return null;
        }
        return (
          <StepComponent
            key={step}
            stepName={step}
            config={steps[step]}
            stepData={formData[step]}
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
