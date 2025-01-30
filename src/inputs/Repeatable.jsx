import PropTypes from "prop-types";
import components from "./collection.jsx";
import Box from "@mui/material/Box";
import { Add, Delete } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import { CCFormButton, CCFormCard } from "../ThemedComponents.jsx";
import { Fragment } from "react";
import { Grid2 } from "@mui/material";

// todo: update for the new structure
const Repeatable = ({ config, stepData, onChange }) => {
  const values = stepData || [];

  const handleAdd = () => {
    const newValues = [...values, {}];
    onChange(newValues);
  };

  const handleRemove = (index) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  return (
    <Grid2 size={12}>
      {values.map((value, index) => (
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
            {config.elements.map((element) => {
              const handleValueChange = (value) => {
                const newValues = [...values];
                newValues[index] = {
                  ...newValues[index],
                  [element.name]: value,
                };
                onChange(newValues);
              };

              const Component = components[element.type];
              if (!Component) {
                console.log("Skipping element", element.type);
                return null;
              }
              return (
                <Fragment key={element.name}>
                  <Component
                    config={element}
                    stepData={value[element.name] || element.default}
                    onChange={(value) => handleValueChange(value)}
                  />
                </Fragment>
              );
            })}
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
      ))}
      <CCFormButton
        variant="text"
        size="large"
        startIcon={<Add />}
        onClick={handleAdd}
      >
        Add
      </CCFormButton>
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
};

export default Repeatable;
