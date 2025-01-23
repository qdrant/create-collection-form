import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  TextField,
  MenuItem,
  Typography,
  InputBase, InputLabel, FormControl,
} from '@mui/material';

const NumberWithSuggestions = ({ config, stepData, onChange }) => {
  const value = stepData || "";

  return (
    <Autocomplete
      freeSolo
      options={config.suggestions}
      getOptionLabel={(option) => option.value.toString()}
      inputValue={value + ""}
      onInputChange={(event, newInputValue) => {
        let valueNumber = parseInt(newInputValue);
        if (isNaN(valueNumber)) {
          valueNumber = "";
        }
        onChange(valueNumber);
      }}
      renderOption={(props, option) => {
        // Render option as value (bold) + label (normal)
        const { key, ...optionProps } = props;
        return (
          <MenuItem key={key} {...optionProps}>
            <Typography variant="body1" fontWeight="bold">
              {option.value}&nbsp;
            </Typography>
            - {option.label}
          </MenuItem>
        );
      }}
      renderInput={(params) => (
          <FormControl variant="standard">
            <InputLabel shrink htmlFor={config.name}>
              {config.title}
            </InputLabel>
            <InputBase
                {...params.InputProps}
                inputProps={params.inputProps}
                id={config.name}
                value={value || config.default || ""}
            />
          </FormControl>
      )}/>
  );
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
  stepData: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default NumberWithSuggestions;
