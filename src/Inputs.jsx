// import { useState } from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

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
