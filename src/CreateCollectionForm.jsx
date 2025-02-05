import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { steps } from "./flow.js";
import CardsSelect from "./CardsSelect.jsx";
import TenantFieldSelectionStep from "./steps/TenantFieldSelectionStep.jsx";
import SimpleDenseEmbeddingStep from "./steps/SimpleDenseEmbeddingStep.jsx";
import SimpleHybridEmbeddingStep from "./steps/SimpleHybridEmbeddingStep.jsx";
import IndexFieldSelectionStep from "./steps/IndexFieldSelectionStep.jsx";
import { Grid2 } from "@mui/material";
import { CCFormButton, CCFormRoot } from "./ThemedComponents";
import GenericElementsStep from "./steps/GenericElementsStep.jsx";
import { prepareOutput } from "./prepareOutput.js";

export const CreateCollectionForm = function CreateCollectionForm({
  onFinish,
}) {
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
    console.log("handleStepApply", stepName, data);
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

  // Scroll to the bottom of the page on step change
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [path]);

  const stepsComponents = {
    "use-case-step": CardsSelect,
    "tenant-field-selection-step": TenantFieldSelectionStep,
    "templates-selection-step": CardsSelect,
    "simple-dense-embedding-step": SimpleDenseEmbeddingStep,
    "simple-hybrid-embedding-step": SimpleHybridEmbeddingStep,
    "index-field-selection-step": IndexFieldSelectionStep,
  };

  const totalSteps = path.length;
  let isAllCompleted = true;
  let isFinished = false;

  const renderedSteps = path.map((step, index) => {
    let StepComponent = stepsComponents[step];
    if (!StepComponent) {
      StepComponent = GenericElementsStep;
    }

    const restoredValue = localStorage.getItem("formData")?.[step];
    const stepData = formData[step] || restoredValue;
    const isLast = index === totalSteps - 1;

    let isStepCompleted = true;
    if (typeof stepData === "object") {
      isStepCompleted = stepData?.completed;
    } else {
      isStepCompleted = !!stepData;
    }

    isAllCompleted = isAllCompleted && isStepCompleted;
    const stepConfig = steps[step];

    if (stepConfig?.finish) {
      isFinished = true;
    }

    return (
      <Box
        key={step}
        sx={{
          mb: 8,
        }}
      >
        <StepComponent
          stepName={step}
          config={stepConfig}
          stepData={stepData}
          onApply={handleStepApply}
          isLast={isLast}
        />
      </Box>
    );
  });

  const handleFinish = () => {
    onFinish(prepareOutput(formData, path));
  };

  return (
    <CCFormRoot>
      {renderedSteps}

      {isFinished && (
        // todo: update
        <Grid2 size={12} display={"flex"} justifyContent={"flex-end"}>
          <CCFormButton
            // key={element.title}
            disabled={!isAllCompleted}
            variant="contained"
            onClick={handleFinish}
          >
            Finish
          </CCFormButton>
        </Grid2>
      )}
    </CCFormRoot>
  );
};

// props validation
CreateCollectionForm.propTypes = {
  ref: PropTypes.object,
  onFinish: PropTypes.func.isRequired,
};

export default CreateCollectionForm;
