import Box from "@mui/material/Box";
import { elements } from "../flow.js";
import PropTypes from "prop-types";
import { Grid2, Typography } from "@mui/material";
import components from "./collection.jsx";
import { Fragment } from "react";

const GenericInputs = function ({ config, stepData, onChange }) {
  return (
    <>
      {/* <Grid2 container spacing={2}> */}
      {config.elements.map((element) => {
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
        let elementData = stepData && stepData[element.name];
        if (elementData === undefined) {
          elementData = element.default;
        }

        return (
          <Fragment key={element.name}>
            <Component
              config={{
                ...(elements[element.type] || {}),
                ...element,
              }}
              stepData={elementData}
              onChange={configOnChange}
            />
          </Fragment>
        );
      })}
    </>
  );
};

// todo: decide on default stepData alternative name

// props validation
GenericInputs.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  stepData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default GenericInputs;
