import { elements } from "../flow.js";
import { Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import components from "../inputs/components-map.jsx";
import { CCFormButton, CCFormTitle } from "../ThemedComponents.jsx";
import { Fragment, useEffect } from "react";
import { checkCompleted } from "../inputs/checkCompleted.js";

const GenericElementsStep = function ({
                                        stepName,
                                        config,
                                        stepData,
                                        onApply,
                                        isLast = true,
                                      }) {
  const value = stepData || {};

  let isStepCompleted = true;
  let totalElements = config.elements && config.elements.length;

  const renderedElements =
    config.elements &&
    config.elements.map((element, idx) => {
      const elementConfig = {
        ...(elements[element.type] || {}),
        ...element,
      };

      const elementData = value[element.name];

      const isElementRequired = elementConfig.required === true;
      let isElementCompleted = checkCompleted(elementData, isElementRequired);

      isStepCompleted = isStepCompleted && isElementCompleted;

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
            isLast={idx === totalElements - 1 && isLast}
          />
        </Fragment>
      );
    });

  useEffect(() => {
    if (!stepData) return;

    const isRegisteredCompleted = stepData.completed === true;
    if (isStepCompleted !== isRegisteredCompleted) {
      onApply(stepName, {
        ...stepData,
        completed: isStepCompleted
      }, null);
    }
  }, [isStepCompleted, stepData?.completed]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <CCFormTitle sx={{ mb: 2 }}>{config.title}</CCFormTitle>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {config.description}
        </Typography>
      </Grid2>

      {renderedElements}

      {config.button && isLast && (
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
    description: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
    button: PropTypes.shape({
      title: PropTypes.string.isRequired,
      "on-click": PropTypes.shape({
        "continue-step": PropTypes.string,
      }),
    }),
  }),
  stepData: PropTypes.any,
  onApply: PropTypes.func.isRequired,
  isLast: PropTypes.bool,
};

export default GenericElementsStep;
