import PropTypes from "prop-types";
import { Add, Delete } from "@mui/icons-material";
import { Divider, Grid2 } from "@mui/material";
import { CCFormButton, CCFormCard } from "../ThemedComponents.jsx";
import GenericInputs from "./GenericInputs";
import { useEffect } from "react";

// todo: update for the new structure
const Repeatable = ({ config, stepData, onChange, isLast = false }) => {
  const values = stepData || [];

  const maxRepetitions = config?.maxRepetitions || 10000;

  useEffect(() => {
    // Check if stepData is an array
    if (!Array.isArray(stepData)) {
      console.log("Repeatable: stepData is not an array", stepData);
      onChange([]);
    }
  }, [stepData]);

  const handleAdd = () => {
    const newValues = [...values, {}];
    onChange(newValues);
  };

  useEffect(() => {
    if (isLast) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [stepData]);

  const handleRemove = (index) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  return (
    <Grid2 size={12}>
      {values.map((value, index) => {
        const elementOnChange = (value) => {
          const newValues = [...values];
          newValues[index] = value;
          onChange(newValues);
        };

        return (
          <CCFormCard
            sx={{
              px: 2,
              pt: 2,
              pb: 1,
              mt: 2,
              display: "flex",
              flexDirection: "column",
            }}
            key={index}
          >
            <Grid2 container spacing={2}>
              <GenericInputs
                config={config}
                stepData={value}
                onChange={elementOnChange}
              />
            </Grid2>

            <Divider sx={{ mt: 2, mb: 1, mx: -4 }} />

            <CCFormButton
              variant="text"
              size={"small"}
              startIcon={<Delete />}
              sx={{ alignSelf: "end" }}
              onClick={() => handleRemove(index)}
            >
              Remove
            </CCFormButton>
          </CCFormCard>
        );
      })}
      {values.length < maxRepetitions && (
        <CCFormButton
          variant="text"
          size="large"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add
        </CCFormButton>
      )}
    </Grid2>
  );
};

Repeatable.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    elements: PropTypes.array,
  }).isRequired,
  stepData: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  isLast: PropTypes.bool,
};

export default Repeatable;
