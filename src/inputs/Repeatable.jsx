import PropTypes from "prop-types";
import components from "./collection.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Add, Delete } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";

// todo: update for the new structure
const Repeatable = ({ config, stepData, onChange }) => {
  const values = stepData || [];

  const handleAdd = () => {
    const newValues = [...values, {}];
    onChange(newValues);
  };

  const handleRemove = (index) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  return (
    <Box>
      {values.map((value, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {config.groups?.length &&
            config.groups.map((group, groupIndex) => {
              return (
                <Card
                  variant={group.variant}
                  key={groupIndex}
                  sx={{
                    p: 2,
                    mb: 3,
                  }}
                >
                  {group.elements.map((element) => {
                    const handleValueChange = (value) => {
                      const newValues = [...values];
                      newValues[index] = {
                        ...newValues[index],
                        [element.name]: value,
                      };
                      onChange(newValues);
                    };

                    const Component = components[element.type];
                    if (!Component) {
                      console.log("Skipping element", element.type);
                      return null;
                    }
                    return (
                      <Box key={element.name}>
                        <Component
                          config={element}
                          stepData={value[element.name] || element.default}
                          onChange={(value) => handleValueChange(value)}
                        />
                      </Box>
                    );
                  })}
                </Card>
              );
            })}
          <Button
            variant="text"
            size={"small"}
            startIcon={<Delete />}
            sx={{ alignSelf: "end" }}
            onClick={() => handleRemove(index)}
          >
            Remove
          </Button>
          {config.elements.length > 1 && (
            <Divider sx={{ mt: 2, mb: 3, mx: -4 }} />
          )}
        </Box>
      ))}
      <Button
        variant="text"
        size="large"
        startIcon={<Add />}
        onClick={handleAdd}
      >
        Add
      </Button>
    </Box>
  );
};

Repeatable.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    elements: PropTypes.array,
  }).isRequired,
  stepData: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default Repeatable;
