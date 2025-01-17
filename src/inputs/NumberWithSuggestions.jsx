import React, { useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField, MenuItem, Typography } from "@mui/material";


const NumberWithSuggestions = ({ config, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || "");

  return (<Autocomplete
    freeSolo
    options={config.suggestions}
    getOptionLabel={(option) => option.value.toString()}
    inputValue={value + ""}
    onInputChange={(event, newInputValue) => {
      let valueNumber = parseInt(newInputValue);
      if (isNaN(valueNumber)) {
        valueNumber = "";
      }
      setValue(valueNumber);
      onChange(config.name, valueNumber);
    }}
    renderOption={(props, option) => {
      // Render option as value (bold) + label (normal)
      const { key, ...optionProps } = props;
      return (
        <MenuItem key={key} {...optionProps}>
          <Typography variant="body1" fontWeight="bold">
            {option.value}&nbsp;
          </Typography>- {option.label}
        </MenuItem>
      );

    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={config.title}
        variant="standard"
      />
    )}
  />)
};

// props validation
NumberWithSuggestions.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    suggestions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default NumberWithSuggestions;