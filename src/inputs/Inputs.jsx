// import { useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export const Dropdown = ({ config, stepData, onChange }) => {
  const value = stepData || "";

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  // todo: add labelId and id
  return (
    <Select labelId="" id="" value={value} onChange={handleChange} label="Age">
      {config.options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

// props validation
Dropdown.propTypes = {
  config: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  stepData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export const StringInput = ({ config, stepData, onChange }) => {
  const value = stepData || "";

  // todo:
  // validate input
  return (
    <TextField
      key={config.title}
      variant="standard"
      id={config.name}
      label={config.title}
      value={value || config.default || ""}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

// props validation
StringInput.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    default: PropTypes.string,
  }).isRequired,
  stepData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export const Checkbox = ({ config, stepData, onChange }) => {
  const value = stepData || false;

  // console.log("Checkbox", value);

  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <MuiCheckbox
      checked={value}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

// props validation
Checkbox.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  stepData: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};


export const NumberInput = ({ config, stepData, onChange }) => {
  const value = stepData || 0;

  const handleChange = (e) => {
    let valueNumber = parseInt(e.target.value);
    if (isNaN(valueNumber)) {
      valueNumber = 0;
    }
    onChange(valueNumber);
  }

  return (
    <TextField
      key={config.title}
      variant="standard"
      id={config.name}
      label={config.title}
      value={value || config.default || ""}
      onChange={handleChange}
      type="number"
    />
  );
}

// props validation
NumberInput.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    default: PropTypes.number,
  }).isRequired,
  stepData: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
