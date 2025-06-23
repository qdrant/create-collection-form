import { Grid } from "@mui/material";
import { CCFormCard } from "../ThemedComponents";
import GenericInputs from "./GenericInputs";
import PropTypes from "prop-types";

const Group = function ({ config, stepData, onChange }) {
  return (
    <Grid size={12}>
      <CCFormCard
        sx={{
          p: 2,
          mt: 2,
          borderRadius: 5,
        }}
      >
        <Grid container spacing={2}>
          <GenericInputs
            config={config}
            stepData={stepData}
            onChange={onChange}
          />
        </Grid>
      </CCFormCard>
    </Grid>
  );
};

Group.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string,
    elements: PropTypes.array,
  }).isRequired,
  stepData: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
export default Group;
