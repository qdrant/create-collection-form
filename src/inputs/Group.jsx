import { Grid, Grid2 } from "@mui/material";
import { CCFormCard } from "../ThemedComponents";
import GenericInputs from "./GenericInputs";
import PropTypes from "prop-types";

const Group = function ({ config, stepData, onChange }) {
  console.log("Group config", config);

  return (
    <Grid2 size={12}>
      <CCFormCard
        sx={{
          p: 2,
          mt: 2,
        }}
      >
        <Grid2 container spacing={2}>
          <GenericInputs
            config={config}
            stepData={stepData}
            onChange={onChange}
          />
        </Grid2>
      </CCFormCard>
    </Grid2>
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
