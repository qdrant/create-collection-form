import { elements } from "../flow.js";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import components from "../inputs/collection.jsx";
import { CCFormButton, CCFormTitle } from "../ThemedComponents.jsx";
import { Grid2 } from "@mui/material";
import { Fragment } from "react";
import { checkCompleted } from "../inputs/checkCompleted.js";

const GenericElementsStep = function ({ stepName, config, stepData, onApply }) {
  const value = stepData || {};

  let isStepCompleted = true;

  const renderedElements = config.elements &&
    config.elements.map((element, idx) => {

      const elementConfig = {
        ...(elements[element.type] || {}),
        ...element,
      };

      const elementData = value[element.name];

      const isElementRequired = elementConfig.required === true;
      let isElementCompleted = checkCompleted(elementData);

      isStepCompleted = isStepCompleted && (!isElementRequired || isElementCompleted);

      const onChange = (value) => {
        // We need to understand if stepData is completed. 
        // If value if an object, we need to rely on completed field.
        // If value is something else, we just check that it is not empty.
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
            config={elementConfig}
            stepData={elementData}
            onChange={onChange}
          />
        </Fragment>
      );
    });

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <CCFormTitle sx={{ mb: 2 }}>{config.title}</CCFormTitle>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {config.description}
        </Typography>
      </Grid2>

      {renderedElements}

      {config.button && (
        // todo: update
        <Grid2 size={12} display={"flex"} justifyContent={"flex-end"}>
          <CCFormButton
            // key={element.title}
            disabled={!isStepCompleted}
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
