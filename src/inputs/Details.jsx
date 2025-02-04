import { Grid2 } from "@mui/material";
import GenericInputs from "./GenericInputs";
import PropTypes from "prop-types";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Details = function ({ config, stepData, onChange }) {

  const size = config.size || 12;

  return (
    <Grid2 size={size}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
        >
          Advanced Configuration
        </AccordionSummary>
        <AccordionDetails>
          <Grid2 container spacing={2}>
            <GenericInputs
              config={config}
              stepData={stepData}
              onChange={onChange}
            />
          </Grid2>
        </AccordionDetails>
      </Accordion>
    </Grid2>
  );
};

Details.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string,
    elements: PropTypes.array,
  }).isRequired,
  stepData: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default Details;
