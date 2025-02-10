import React from "react";
import PropTypes from "prop-types";
import { CCFormSlider } from "../ThemedComponents.jsx";

const EnumSlider = ({ config, stepData, onChange }) => {
  const defaultValue = config.defaultValue;
  const value = stepData || defaultValue;
  const options = config.options;

  const defaultValueIndex = options.indexOf(defaultValue);

  const handleChange = (e) => {
    onChange(options[e.target.value]);
  };

  const marks = options.map((option, index) => {
    return {
      value: index,
      label: option,
    };
  });

  function valuetext(value) {
    return options[value];
  }

  // todo: add labelId and id
  return (
    <CCFormSlider
      aria-label={config.title}
      defaultValue={defaultValueIndex}
      getAriaValueText={valuetext}
      value={options.indexOf(value)}
      step={null}
      valueLabelDisplay="off"
      marks={marks}
      onChange={handleChange}
      min={0}
      max={options.length - 1}
    />
  );
};

// props validation
EnumSlider.propTypes = {
  config: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  stepData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default EnumSlider;
