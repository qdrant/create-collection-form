// import { useState } from "react";
import {
  Card,
  CardContent,
  MenuItem,
  Select,
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



export const Dropdown = ({ config, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(config.name, e.target.value);
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
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export const StringInput = ({ config, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || "");

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
        setValue(e.target.value);
        onChange(config.name, e.target.value);
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
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export const Checkbox = ({ config, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || false);

  const handleChange = (e) => {
    setValue(e.target.checked);
    onChange(config.name, e.target.checked);
  };

  return (
    <TextField
      key={config.title}
      variant="standard"
      id={config.name}
      label={config.title}
      type="checkbox"
      checked={value}
      onChange={handleChange}
    />
  );
};