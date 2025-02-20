export const preparePayloadFields = (config) => {
  if (!config) return [];
  const indexStepData = config["index-field-selection-step"];
  if (indexStepData && indexStepData.payload_fields) {
    return indexStepData.payload_fields;
  }
  if (config.payload_indexes) {
    return config.payload_indexes.map(index => ({
      field_name: index.name,
      field_config: {
        field_config_enum: index.type,
        parentCompleted: true,
        completed: true,
        ...(index.params || {})
      },
      completed: true
    }));
  }
  return [];
};

export const getCleanParams = (fieldConfig) => {
  if (!fieldConfig || Object.keys(fieldConfig).length <= 3) return {};
  const fieldType = fieldConfig.field_config_enum;
  const validParamsByType = {
    integer: ['lookup', 'range'],
    text: ['tokenizer', 'lowercase', 'min_token_len', 'max_token_len']
  };
  const allowedParams = validParamsByType[fieldType] || [];
  const filteredEntries = Object.entries(fieldConfig)
    .filter(([key]) =>
      allowedParams.includes(key) &&
      fieldConfig[key] !== undefined &&
      fieldConfig[key] !== ""
    );
  if (filteredEntries.length === 0) return {};
  return { params: Object.fromEntries(filteredEntries) };
};

export const convertPayloadFieldsToIndexes = (payloadFields) => {
  if (!payloadFields) return [];

  return payloadFields.map(field => {
    if (!field || !field.field_config) {
      return { name: field?.field_name || "", type: "keyword" };
    }
    return {
      name: field.field_name,
      type: field.field_config.field_config_enum,
      ...(getCleanParams(field.field_config))
    };
  });
};
