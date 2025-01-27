import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {
  createTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { defaultTheme } from "./theme/theme.js";
import { steps } from "./flow.js";
import CardsSelect from "./CardsSelect.jsx";
import TenantFieldSelectionStep from "./steps/TenantFieldSelectionStep.jsx";
import SimpleDenseEmbeddingStep from "./steps/SimpleDenseEmbeddingStep.jsx";
import SimpleHybridEmbeddingStep from "./steps/SimpleHybridEmbeddingStep.jsx";
import IndexFieldSelectionStep from "./steps/IndexFieldSelectionStep.jsx";

// todo:
// 1. scroll to the next step
export function CreateCollectionForm({ theme = defaultTheme }) {
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
    "index-field-selection-step": IndexFieldSelectionStep,
  };

  const mode = useTheme().palette.mode;
  const componentTheme = useMemo(() => {
    return createTheme(
      {
        palette: {
          mode,
        },
      },
      mode === "dark" ? theme.colorSchemes.dark : theme.colorSchemes.light,
    );
  }, [mode, theme.colorSchemes.dark, theme.colorSchemes.light]);

  return (
    <ThemeProvider theme={componentTheme}>
      <CssBaseline />
      <Box
        sx={{
          pt: 6,
        }}
      >
        {path.map((step) => {
          const StepComponent = stepsComponents[step];
          if (!StepComponent) {
            return null;
          }

          const restoredValue = localStorage.getItem("formData")?.[step];
          const stepData = formData[step] || restoredValue;

          return (
            <Box
              sx={{
                mb: 7,
              }}
            >
              <StepComponent
                key={step}
                stepName={step}
                config={steps[step]}
                stepData={stepData}
                onApply={handleStepApply}
              />
            </Box>
          );
        })}
      </Box>
    </ThemeProvider>
  );
}

// props validation
CreateCollectionForm.propTypes = {
  theme: PropTypes.object,
};

export default CreateCollectionForm;
