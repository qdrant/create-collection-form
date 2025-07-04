import { AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import GenericInputs from "./GenericInputs";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CCFormAccordion } from "../ThemedComponents.jsx";

const Details = function ({ config, stepData, onChange }) {
  const size = config.size || 12;

  return (
    <Grid size={size}>
      <CCFormAccordion>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          Advanced Configuration
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <GenericInputs
              config={config}
              stepData={stepData}
              onChange={onChange}
            />
          </Grid>
        </AccordionDetails>
      </CCFormAccordion>
    </Grid>
  );
};

Details.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string,
    elements: PropTypes.array,
    size: PropTypes.number,
  }).isRequired,
  stepData: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default Details;
