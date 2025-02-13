import { FormControlLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import {
  CCFormCheckbox,
  CCFormControl,
  CCFormInputBase,
  CCFormLabel,
} from "../ThemedComponents.jsx";

export const Dropdown = ({ config, stepData, onChange }) => {
  const value = stepData || "";

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  // todo: add labelId and id
  return (
    <CCFormControl variant="standard">
      <CCFormLabel shrink htmlFor={config.name}>
        {config.title}
      </CCFormLabel>
      <Select
        labelId=""
        id=""
        value={value}
        onChange={handleChange}
        input={<CCFormInputBase variant="outlined" />}
        MenuProps={{
          classes: {
            list: "dropdown-list",
          },
        }}
      >
        {config.options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </CCFormControl>
  );
};

// props validation
Dropdown.propTypes = {
  config: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
  stepData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export const StringInput = ({ config, stepData, onChange }) => {
  const defaultValue = config.default || "";

  const value = !stepData && stepData !== "" ? defaultValue : stepData;

  // todo:
  // validate input
  return (
    <CCFormControl variant="standard">
      <CCFormLabel shrink htmlFor={config.name}>
        {config.title}
      </CCFormLabel>
      <CCFormInputBase
        key={config.title}
        id={config.name}
        placeholder={config.placeholder || ""}
        variant={config.variant || "standard"}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </CCFormControl>
  );
};

// props validation
StringInput.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    default: PropTypes.string,
    placeholder: PropTypes.string,
    variant: PropTypes.string,
  }).isRequired,
  stepData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export const Checkbox = ({ config, stepData, onChange }) => {
  const value = stepData || false;

  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <CCFormControl sx={{ display: "flex", flexDirection: "row" }}>
      <FormControlLabel
        label={config.title}
        control={
          <CCFormCheckbox
            sx={{ alignSelf: "start" }}
            checked={value}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
    </CCFormControl>
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

  const maxValue = config?.max;
  const minValue = config?.min;

  const handleChange = (e) => {
    let valueNumber = parseInt(e.target.value);
    if (isNaN(valueNumber)) {
      valueNumber = 0;
    } else {
      if (maxValue && valueNumber > maxValue) {
        valueNumber = maxValue;
      }
      if (minValue && valueNumber < minValue) {
        valueNumber = minValue;
      }
    }
    onChange(valueNumber);
  };

  return (
    <CCFormControl variant="standard">
      <CCFormLabel shrink htmlFor={config.name}>
        {config.title}
      </CCFormLabel>
      <CCFormInputBase
        key={config.title}
        variant="outlined"
        id={config.name}
        value={value || config.default || ""}
        onChange={handleChange}
        ownerState={{ variant: "outlined" }}
      />
    </CCFormControl>
  );
};

// props validation
NumberInput.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    default: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
  }).isRequired,
  stepData: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
