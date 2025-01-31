import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { steps } from "./flow.js";
import CardsSelect from "./CardsSelect.jsx";
import TenantFieldSelectionStep from "./steps/TenantFieldSelectionStep.jsx";
import SimpleDenseEmbeddingStep from "./steps/SimpleDenseEmbeddingStep.jsx";
import SimpleHybridEmbeddingStep from "./steps/SimpleHybridEmbeddingStep.jsx";
import IndexFieldSelectionStep from "./steps/IndexFieldSelectionStep.jsx";
import { useThemeProps } from "@mui/material";
import { CCFormRoot } from "./ThemedComponents";

export const CreateCollectionForm = forwardRef(
  function CreateCollectionForm(inProps, ref) {
    const props = useThemeProps({
      props: inProps,
      name: "MuiCreateCollectionForm",
    });
    const { ...other } = props;

    const ownerState = { ...props };

    const [path, setPath] = useState(() => {
      return JSON.parse(localStorage.getItem("path")) || ["use-case-step"];
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
      "index-field-selection-step": IndexFieldSelectionStep,
    };

    return (
      <CCFormRoot ref={ref} ownerState={ownerState} {...other}>
        {path.map((step) => {
          const StepComponent = stepsComponents[step];
          if (!StepComponent) {
            return null;
          }

          const restoredValue = localStorage.getItem("formData")?.[step];
          const stepData = formData[step] || restoredValue;

          return (
            <Box
              key={step}
              sx={{
                mb: 8,
              }}
            >
              <StepComponent
                stepName={step}
                config={steps[step]}
                stepData={stepData}
                onApply={handleStepApply}
              />
            </Box>
          );
        })}
      </CCFormRoot>
    );
  },
);

// props validation
CreateCollectionForm.propTypes = {
  ref: PropTypes.object,
};

export default CreateCollectionForm;
