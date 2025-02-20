import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import PayloadFieldsEditor from "./PayloadFieldsEditor";
import { CCFormButton } from "./ThemedComponents";

const PayloadFieldsStep = ({ stepName, config, stepData, onApply, isLast }) => {
  const handlePayloadFieldsChange = (updatedFields) => {
    onApply(stepName, {
      ...stepData,
      payload_fields: updatedFields,
      completed: true
    }, null);
  };

  return (
    <Box>
      <PayloadFieldsEditor
        payloadFields={stepData?.payload_fields || []}
        onChange={handlePayloadFieldsChange}
        title={config.title}
      />
      {config.finish && isLast && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <CCFormButton variant="contained" disabled={!stepData?.completed}>
            Finish
          </CCFormButton>
        </Box>
      )}
    </Box>
  );
};

PayloadFieldsStep.propTypes = {
  stepName: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  stepData: PropTypes.object,
  onApply: PropTypes.func.isRequired,
  isLast: PropTypes.bool
};

export default PayloadFieldsStep;
