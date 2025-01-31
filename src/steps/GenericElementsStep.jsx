import { elements } from "../flow.js";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import components from "../inputs/collection.jsx";
import { CCFormButton, CCFormTitle } from "../ThemedComponents.jsx";
import { Grid2 } from "@mui/material";
import { Fragment } from "react";

const GenericElementsStep = function ({ stepName, config, stepData, onApply }) {
  const value = stepData || {};

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <CCFormTitle sx={{ mb: 2 }}>{config.title}</CCFormTitle>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {config.description}
        </Typography>
      </Grid2>

      {config.elements &&
        config.elements.map((element, idx) => {
          const onChange = (value) => {
            const newValue = { ...stepData, [element.name]: value };
            onApply(stepName, newValue, null);
          };
          const Component = components[element.type];
          if (!Component) {
            console.log("Skipping element", element.type);
            return null;
          }
          return (
            <Fragment key={idx}>
              <Component
                key={element.name}
                config={{
                  ...(elements[element.type] || {}),
                  ...element,
                }}
                stepData={value[element.name]}
                onChange={onChange}
              />
            </Fragment>
          );
        })}

      {config.button && (
        // todo: update
        <Grid2 size={12} display={"flex"} justifyContent={"flex-end"}>
          <CCFormButton
            variant="contained"
            onClick={() =>
              onApply(
                stepName,
                value,
                config.button["on-click"]["continue-step"],
              )
            }
          >
            {config.button.title}
          </CCFormButton>
        </Grid2>
      )}
    </Grid2>
  );
};

// props validation
GenericElementsStep.propTypes = {
  stepName: PropTypes.string.isRequired,
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
  stepData: PropTypes.any,
  onApply: PropTypes.func.isRequired,
};

export default GenericElementsStep;
