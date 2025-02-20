import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { CCFormButton } from "./ThemedComponents";
import IndexFieldSelectionStep from "./steps/IndexFieldSelectionStep";
import { payloadFieldsConfig } from "./payloadFieldsConfig";

const PayloadFieldsEditor = ({ payloadFields, onChange, title = "Payload Indexes" }) => {
  const handleStepApply = (stepName, data) => {
    onChange(data.payload_fields || []);
  };

  const handleAddPayload = () => {
    const newPayloadField = {
      field_name: "",
      field_config: {
        field_config_enum: "keyword",
        parentCompleted: true,
        completed: true
      },
      completed: false
    };
    const updatedFields = [...payloadFields, newPayloadField];
    onChange(updatedFields);
  };

  const config = {
    ...payloadFieldsConfig,
    title
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">
          {title}
        </Typography>
        <CCFormButton
          variant="text"
          startIcon={<Add />}
          onClick={handleAddPayload}
        >
          Add Payload
        </CCFormButton>
      </Box>
      <IndexFieldSelectionStep
        stepName="index-field-selection-step"
        config={config}
        stepData={{
          payload_fields: payloadFields,
          completed: true
        }}
        onApply={handleStepApply}
        isLast={true}
      />
    </Box>
  );
};

PayloadFieldsEditor.propTypes = {
  payloadFields: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default PayloadFieldsEditor;
