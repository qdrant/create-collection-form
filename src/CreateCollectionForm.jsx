import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { steps } from "./flow.js";
import CardsSelect from "./CardsSelect.jsx";
import TenantFieldSelectionStep from "./steps/TenantFieldSelectionStep.jsx";
import SimpleDenseEmbeddingStep from "./steps/SimpleDenseEmbeddingStep.jsx";
import SimpleHybridEmbeddingStep from "./steps/SimpleHybridEmbeddingStep.jsx";
import IndexFieldSelectionStep from "./steps/IndexFieldSelectionStep.jsx";
import { Box, Grid } from "@mui/material";
import { CCFormButton, CCFormRoot } from "./ThemedComponents";
import GenericElementsStep from "./steps/GenericElementsStep.jsx";
import { prepareOutput } from "./prepareOutput.js";
import { ScrollableParentContext } from "./context/scrollable-parent-context.jsx";
import Sidebar from "./Sidebar.jsx";

/**
 * CreateCollectionForm component
 *
 * @param {Object} props - Component props
 * @param {() => Promise<any>} props.onFinish - Async function called on form finish. Must return a resolved value (not undefined), otherwise the form will not be cleared.
 * @param {() => Object} [props.scrollableParent] - Function that returns the parent element
 * @param {Object} [props.sx] - Styles to be applied to the form
 * @param {function} [props.onPreviewFormOutput] - Function to process the preview output data. Sidebar is shown only when this prop is provided and is a function.
 * @returns {JSX.Element}
 */
export const CreateCollectionForm = function CreateCollectionForm({
  onFinish,
  scrollableParent,
  sx,
  onPreviewFormOutput,
  ...props
}) {
  const resolvedScrollableParent = scrollableParent
    ? scrollableParent
    : () => window;

  const [path, setPath] = useState(() => {
    return JSON.parse(localStorage.getItem("path")) || ["collection-name-step"];
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

  const handleClear = () => {
    setPath(["collection-name-step"]);
    setFormData({});
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
    const currentScrollableParent = resolvedScrollableParent();
    let currentScrollHeight =
      currentScrollableParent === window
        ? document.documentElement.scrollHeight
        : currentScrollableParent.scrollHeight;
    currentScrollableParent.scrollTo({
      top: currentScrollHeight,
      behavior: "smooth",
    });
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

    const stepData = formData[step];
    const isLast = index === totalSteps - 1;

    let isStepCompleted;
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
      <Box key={step} sx={{ mb: 4 }}>
        <StepComponent
          stepName={step}
          config={stepConfig}
          stepData={stepData}
          onApply={handleStepApply}
          isLast={isLast}
          handleClear={handleClear}
          useCard={stepConfig.useCard}
        />
      </Box>
    );
  });

  const handleFinish = () => {
    const output = prepareOutput(formData, path);
    if (output) {
      onFinish(output).then((result) => {
        if (!result) {
          return;
        }
        handleClear();
      });
    } else {
      console.error("Failed to prepare output");
    }
  };

  return (
    <ScrollableParentContext.Provider
      value={{ scrollableParent: resolvedScrollableParent }}
    >
      <CCFormRoot>
        <Grid container spacing={4}>
          <Grid
            size={
              onPreviewFormOutput && typeof onPreviewFormOutput === "function"
                ? 8
                : 12
            }
          >
            {renderedSteps}

            {isFinished &&
            Object.values(formData).some(
              (data) => typeof data === "object" && data?.completed,
            ) ? (
              <Grid size={12} display="flex" justifyContent="flex-end">
                <CCFormButton variant="text" onClick={handleClear}>
                  Clear
                </CCFormButton>
                <CCFormButton
                  disabled={!isAllCompleted}
                  variant="contained"
                  onClick={handleFinish}
                  sx={{ ml: 4 }}
                >
                  Finish
                </CCFormButton>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
          {onPreviewFormOutput && typeof onPreviewFormOutput === "function" && (
            <Grid size={4}>
              <Sidebar
                formData={formData}
                path={path}
                handleOutput={onPreviewFormOutput}
              />
            </Grid>
          )}
        </Grid>
      </CCFormRoot>
    </ScrollableParentContext.Provider>
  );
};

// props validation
CreateCollectionForm.propTypes = {
  ref: PropTypes.object,
  onFinish: PropTypes.func.isRequired,
  scrollableParent: PropTypes.func,
  sx: PropTypes.object,
  onPreviewFormOutput: PropTypes.func,
};

export default CreateCollectionForm;
