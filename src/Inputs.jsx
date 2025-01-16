// import { useState } from "react";
import {
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export const FormCard = ({ card, isActive, onClick }) => {
  return (
    <Card
      sx={{
        cursor: isActive ? "default" : "pointer",
        border: isActive ? "1px solid #000" : "none",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          {card.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

// props validation
FormCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const NumberWithSuggestions = ({ config, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <TextField
      id=""
      select
      label="Select"
      // defaultValue={defaultValue || ""}
      value={value}
      helperText={config.title}
      variant="standard"
      onChange={handleChange}
    >
      {/*todo*/}
      {config.suggestions &&
        config.suggestions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

// props validation
NumberWithSuggestions.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    suggestions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

// export const StrnigInput = ({ config, onChange }) => {
//   const [value, setValue] = useState("");
//
//   const handleChange = (e) => {
//     setValue(e.target.value);
//     onChange(e);
//   };
//   return (
//     <TextField
//       variant="standard"
//       id={config.name}
//       label={config.title}
//       value={value}
//       onChange={handleChange}
//     />
//   );
// };

// const FormInputElements = {
//   'string-input': TextField,
//   'button': Button,
//   'dense-vector-configuration': DenseVectorConfiguration,
// };
