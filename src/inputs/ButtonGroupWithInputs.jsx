import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import components from "./collection.jsx";
import GenericInputs from "./GenericInputs.jsx";



/*
Component capable of rendering the following configuration:

{
    type: "button-group-with-inputs",
    name: "field_config",
    enums: [
        {
        name: "keyword",
        },
        {
        name: "integer",
        fields: [
            {
            name: "lookup",
            type: "checkbox",
            default: true,
            },
            {
            name: "range",
            type: "checkbox",
            default: true,
            },
        ],
        },
        {
        name: "float",
        },
        {
        name: "uuid",
        },
        {
        name: "datetime",
        },
        {
        name: "text",
        fields: [
            {
            name: "tokenizer",
            type: "dropdown",
            options: ["prefix", "whitespace", "word", "multilingual"],
            },
            {
            name: "lowercase",
            type: "checkbox",
            default: true,
            },
            {
            name: "min_token_length",
            type: "number",
            default: null,
            },
            {
            name: "max_token_length",
            type: "number",
            default: null,
            },
        ],
        },
        {
        name: "geo",
        },
        {
        name: "bool",
        },
    ],
    },
*/

const ButtonGroupWithInputs = function ({ config, stepData, onChange }) {

  let allEnumsObject = {};
  config.enums.forEach((enumObject) => {
    allEnumsObject[enumObject.name] = enumObject;
  });

  let selectedEnum = stepData && stepData[config.name + "_enum"];

  let selecedEnumData = allEnumsObject[selectedEnum] || {};
  let selectedEnumFields = selecedEnumData.fields || [];

  return (
    <Box>
      <Typography variant="h6">{config.title}</Typography>
      {/* Select one of the enums with group button */}
      <Box>
        {config.enums.map((enumObject) => {

          let configOnChange = function (value) {
            let newData = {
              ...stepData,
              [config.name + "_enum"]: value,
            }
            console.log("newData", newData);
            onChange(newData);
          };

          return (
            <Box key={enumObject.name}>
              <button
                onClick={() => configOnChange(enumObject.name)}
              >
                {enumObject.name}
              </button>
            </Box>
          );
        })}
      </Box>

      {/* Render fields of the selected enum */}

      <GenericInputs config={{ elements: selectedEnumFields, name: config.name + "_config" }} stepData={stepData} onChange={onChange} />

    </Box>
  );
};

// todo: decide on default stepData alternative name

// props validation
ButtonGroupWithInputs.propTypes = {
  config: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      enums: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          fields: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              type: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              default: PropTypes.any,
            })
          ),
        }),
      ),
    }
  ).isRequired,
  stepData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default ButtonGroupWithInputs;
