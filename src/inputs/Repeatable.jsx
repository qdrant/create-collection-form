import PropTypes from 'prop-types';
import components from "./collection.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const Repeatable = ({ config, stepData, onChange }) => {
    const values = stepData[config.name] || [];

    const handleValueChange = (index, name, value) => {
        const newValues = [...values];
        newValues[index] = {
            ...newValues[index],
            [name]: value,
        }
        onChange(config.name, newValues);
    };

    const handleAdd = () => {
        const newValues = [...values, {}];
        onChange(config.name, newValues);
    };

    const handleRemove = (index) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        onChange(config.name, newValues);
    };

    return (
        <Box>
            {values.map((value, index) => (
                <Box key={index}>
                    {config.elements.map((element) => {
                        const Component = components[element.type];
                        if (!Component) {
                            console.log("Skipping element", element.type);
                            return null;
                        }
                        return (
                            <Box key={element.name}>
                                <Typography variant="h6">{element.title}</Typography>
                                <Component
                                    config={element}
                                    defaultValue={value[element.name] || element.default}
                                    onChange={(name, value) => handleValueChange(index, name, value)}
                                />
                            </Box>
                        );
                    })}
                    <Button onClick={() => handleRemove(index)}>Remove</Button>
                </Box>
            ))}
            <Button onClick={handleAdd}>Add</Button>
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