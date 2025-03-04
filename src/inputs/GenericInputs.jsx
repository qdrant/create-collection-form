import { elements } from "../flow.js";
import PropTypes from "prop-types";
import components from "./components-map.jsx";
import { Fragment, useEffect } from "react";
import { checkCompleted } from "./checkCompleted.js";

const GenericInputs = function ({
  config,
  stepData,
  onChange,
  isLast = false,
}) {
  let allElementsCompleted = true;

  if (stepData?.parentCompleted === false) {
    allElementsCompleted = false;
  }

  let totalElements = config.elements && config.elements.length;

  const renderedElements = (
    <>
      {config.elements.map((element, idx) => {
        const elementConfig = {
          ...(elements[element.type] || {}),
          ...element,
        };

        let elementData = stepData && stepData[element.name];
        if (elementData === undefined) {
          elementData = element.default;
        }

        const isElementRequired = elementConfig.required === true;
        let isElementCompleted = checkCompleted(elementData, isElementRequired);

        allElementsCompleted = allElementsCompleted && isElementCompleted;

        let configOnChange = function (value) {
          let newData = {
            ...stepData,
            [element.name]: value,
          };
          onChange(newData);
        };

        const Component = components[element.type];
        if (!Component) {
          console.log("Skipping element", element.type);
          return null;
        }

        return (
          <Fragment key={element.name}>
            <Component
              config={elementConfig}
              stepData={elementData}
              onChange={configOnChange}
              isLast={idx === totalElements - 1 && isLast}
            />
          </Fragment>
        );
      })}
    </>
  );

  useEffect(() => {
    /// Always change ig complete is not defined
    const isRegisteredCompleted = stepData && stepData.completed === true;
    if (allElementsCompleted !== isRegisteredCompleted) {
      onChange({ ...stepData, completed: allElementsCompleted });
    }
  }, [stepData, allElementsCompleted, onChange]);

  return renderedElements;
};

// todo: decide on default stepData alternative name

// props validation
GenericInputs.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  stepData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  isLast: PropTypes.bool,
};

export default GenericInputs;
