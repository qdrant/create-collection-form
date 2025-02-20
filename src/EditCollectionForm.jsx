import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Container, TextField, Typography, Alert } from "@mui/material";
import { CCFormButton, CCFormRoot, CCFormTitle } from "./ThemedComponents";
import { preparePayloadFields, convertPayloadFieldsToIndexes } from "./payloadFields";
import PayloadFieldsEditor from "./PayloadFieldsEditor";

export const EditCollectionForm = function EditCollectionForm({ onFinish }) {
  const [configText, setConfigText] = useState("");
  const [configData, setConfigData] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [payloadFieldsData, setPayloadFieldsData] = useState([]);

  const handleTextChange = (e) => {
    setConfigText(e.target.value);
    setError(null);
  };

  const handleApplyConfig = () => {
    try {
      let parsed;
      if (configText.startsWith('{')) {
        parsed = JSON.parse(configText);
      } else {
        throw new Error("Invalid JSON format");
      }
      setConfigData(parsed);
      setShowForm(true);
      setError(null);
      const payloadFields = preparePayloadFields(parsed);
      setPayloadFieldsData(payloadFields);
    } catch (err) {
      setError("Invalid JSON configuration");
      setShowForm(false);
    }
  };

  const handlePayloadFieldsChange = (updatedFields) => {
    setPayloadFieldsData(updatedFields);
    if (!configData) return;

    const updatedConfig = {
      ...configData,
      payload_indexes: convertPayloadFieldsToIndexes(updatedFields)
    };
    setConfigData(updatedConfig);
    const formattedJson = JSON.stringify(updatedConfig, null, 2);
    setConfigText(formattedJson);
  };

  return (
    <CCFormRoot>
      <Container maxWidth="xl">
        <CCFormTitle variant="h6" sx={{ mb: 2 }}>
          Edit Collection Configuration
        </CCFormTitle>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Paste your collection configuration JSON below:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={configText}
            onChange={handleTextChange}
            placeholder='{"collection_name": "example", "payload_indexes": [...]}'
            variant="outlined"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <CCFormButton variant="contained" onClick={handleApplyConfig}>
              Apply Configuration
            </CCFormButton>
          </Box>
        </Box>
        {showForm && configData && (
          <Box sx={{ mt: 4 }}>
            <PayloadFieldsEditor
              payloadFields={payloadFieldsData}
              onChange={handlePayloadFieldsChange}
              title="Edit Payload Indexes"
            />
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <CCFormButton
                variant="contained"
                onClick={() => onFinish && onFinish(configData)}
              >
                Save Changes
              </CCFormButton>
            </Box>
          </Box>
        )}
      </Container>
    </CCFormRoot>
  );
};

EditCollectionForm.propTypes = {
  onFinish: PropTypes.func
};

export default EditCollectionForm;
