import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Container, TextField, Typography, Alert } from "@mui/material";
import { CCFormButton, CCFormRoot, CCFormTitle } from "./ThemedComponents";
import IndexFieldSelectionStep from "./steps/IndexFieldSelectionStep";
import { Add } from "@mui/icons-material";
import { preparePayloadFields, convertPayloadFieldsToIndexes } from "./payloadFields";

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

  const handleStepApply = (stepName, data) => {
    if (!configData) return;
    setPayloadFieldsData(data.payload_fields || []);
    const updatedConfig = {
      ...configData,
      payload_indexes: convertPayloadFieldsToIndexes(data.payload_fields)
    };
    setConfigData(updatedConfig);
    const formattedJson = JSON.stringify(updatedConfig, null, 2);
    setConfigText(formattedJson);
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
    const updatedFields = [...payloadFieldsData, newPayloadField];
    setPayloadFieldsData(updatedFields);
    handleStepApply('index-field-selection-step', {
      payload_fields: updatedFields,
      completed: true
    });
  };

  useEffect(() => {
    if (showForm && configData && payloadFieldsData.length > 0) {
      handleStepApply('index-field-selection-step', {
        payload_fields: payloadFieldsData,
        completed: true
      });
    }
  }, [payloadFieldsData]);

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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">
                Edit Payload Indexes
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
              config={{
                title: "Payload Indexes",
                description: "Edit payload indexes for filtering",
                elements: [
                  {
                    type: "repeatable",
                    name: "payload_fields",
                    maxRepetitions: 10,
                    elements: [
                      {
                        type: "string-input",
                        title: "Field name",
                        name: "field_name",
                        placeholder: "Example: document-id",
                        size: 12,
                        required: true,
                      },
                      {
                        type: "button-group-with-inputs",
                        title: "Field type",
                        name: "field_config",
                        required: true,
                        size: 12,
                        enums: [
                          { name: "keyword" },
                          {
                            name: "integer",
                            fields: [
                              {
                                title: "Allow match filters",
                                name: "lookup",
                                type: "checkbox",
                                default: true,
                                size: 3,
                              },
                              {
                                type: "description",
                                description: "This checkbox enables indexing of the integer field for exact match filters. \n If enabled, index will consume additional memory.",
                                link: "https://qdrant.tech/documentation/concepts/indexing/#parameterized-index",
                                linkText: "Learn more",
                                name: "lookup_description",
                                size: 9,
                              },
                              {
                                title: "Allow range filters",
                                name: "range",
                                type: "checkbox",
                                default: true,
                                size: 3,
                              },
                              {
                                type: "description",
                                description: "This checkbox enables indexing of the integer field for range filters. \n If enabled, index will consume additional memory.",
                                link: "https://qdrant.tech/documentation/concepts/indexing/#parameterized-index",
                                linkText: "Learn more",
                                name: "range_description",
                                size: 9,
                              },
                            ],
                          },
                          { name: "float" },
                          { name: "uuid" },
                          { name: "datetime" },
                          {
                            name: "text",
                            fields: [
                              {
                                title: "Tokenizer",
                                name: "tokenizer",
                                type: "dropdown",
                                options: ["prefix", "whitespace", "word", "multilingual"],
                                default: "whitespace",
                                size: 4,
                              },
                              {
                                type: "description",
                                description: "Defines how the text is tokenized",
                                link: "https://qdrant.tech/documentation/concepts/indexing/#full-text-index",
                                linkText: "Learn more",
                                name: "tokenizer_description",
                                size: 8,
                              },
                              {
                                title: "Lowercase",
                                name: "lowercase",
                                type: "checkbox",
                                default: true,
                                size: 4,
                              },
                              {
                                type: "description",
                                description: "Converts all characters to lowercase",
                                link: "https://qdrant.tech/documentation/concepts/indexing/#full-text-index",
                                linkText: "Learn more",
                                name: "lowercase_description",
                                size: 8,
                              },
                              {
                                title: "Min token length",
                                name: "min_token_len",
                                type: "number",
                                min: 1,
                              },
                              {
                                title: "Max token length",
                                name: "max_token_len",
                                type: "number",
                                min: 1,
                              },
                            ],
                          },
                          { name: "geo" },
                          { name: "bool" },
                        ],
                      },
                    ],
                  },
                ],
              }}
              stepData={{
                payload_fields: payloadFieldsData,
                completed: true
              }}
              onApply={handleStepApply}
              isLast={true}
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
