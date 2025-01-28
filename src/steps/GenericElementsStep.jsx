import Box from "@mui/material/Box";
import { elements } from "../flow.js";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import components from "../inputs/collection.jsx";
import { CCFormButton, CCFormCard } from "../ThemedComponents.jsx";

const GenericElementsStep = function ({ stepName, config, stepData, onApply }) {
  const value = stepData || {};

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {config.title}
      </Typography>

      {/*todo: don't use index as key*/}
      {config.groups?.length &&
        config.groups.map((group, groupIndex) => {
          console.log(group.variant);

          return (
            <CCFormCard
              variant={group.variant}
              key={groupIndex}
              sx={{
                p: 2,
                mb: 3,
              }}
            >
              {group.elements.map((element, idx) => {
                const onChange = (value) => {
                  const newValue = { ...stepData, [element.name]: value };
                  onApply(stepName, newValue, null);
                };
                const Component = components[element.type];
                if (!Component) {
                  console.log("Skipping element", element.type);
                  return null;
                }
                return (
                  <Box key={idx}>
                    <Component
                      key={element.name}
                      config={{
                        ...(elements[element.type] || {}),
                        ...element,
                      }}
                      stepData={value[element.name]}
                      onChange={onChange}
                    />
                  </Box>
                );
              })}
            </CCFormCard>
          );
        })}
      {config.button && (
        // todo: update
        <CCFormButton
          // key={element.title}
          variant="contained"
          onClick={() =>
            onApply(stepName, value, config.button["on-click"]["continue-step"])
          }
        >
          {config.button.title}
        </CCFormButton>
      )}
    </Box>
  );
};

// props validation
GenericElementsStep.propTypes = {
  stepName: PropTypes.string.isRequired,
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        elements: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }),
        ),
      }),
    ),
  }),
  stepData: PropTypes.any,
  onApply: PropTypes.func.isRequired,
};

export default GenericElementsStep;
