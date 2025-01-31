// This file contains a definition of a form flow.
// It contains a list of steps and a list of transitions, with the descprion of the steps.

export const elements = {
  "dense-vector-configuration": {
    elements: [
      {
        type: "number-with-suggestions",
        title: "Choose dimensions",
        name: "dimensions",
        suggestions: [
          {
            label: "CLIP",
            value: 512,
          },
          {
            label: "openai-ai/text-embedding-3-small",
            value: 1536,
          },
          {
            label: "openai-ai/text-embedding-3-large",
            value: 3072,
          },
        ],
      },
      {
        type: "dropdown",
        name: "metric",
        options: ["Cosine", "Euclid", "Dot", "Manhattan"],
        default: "Cosine",
        title: "Choose metric",
      },
    ],
  },
  "sparse-vector-configuration": {
    elements: [
      {
        type: "checkbox",
        title: "Use IDF?",
        name: "use_idf",
        default: true,
      },
    ],
  },
};

// ToDo: Each step except for the last one should have "continue-step".
// If it doesn't have "continue-step", that means we should add one.

export const steps = {
  "use-case-step": {
    // In this config user should select from 2 cards, which type of search they want to perform
    title: "Create new collection",
    description: "What's your use case?",
    gap: 6,
    cards: [
      {
        title: "Global search",
        icon: {
          path: "M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.9164 16.2299 13.6529 14.9823 14.917C14.971 14.9273 14.9598 14.938 14.9489 14.9489C14.938 14.9598 14.9273 14.971 14.917 14.9823C13.6529 16.2299 11.9164 17 10 17C6.13401 17 3 13.866 3 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L15.6177 17.0319Z",
        },
        size: 4,
        "short-description": "Search across the whole collection",
        description:
          "Search across whole collection of data with optional filters. For example: e-commerce search, website search, etc.",
        name: "global-search",
        "on-select": {
          "continue-step": "templates-selection-step",
        },
      },
      {
        title: "Multitenancy",
        size: 4,
        "short-description": "Many tenants, isolated data",
        description:
          "Search across multiple isolated tenants. For example: per-user documents, chat history search, organization-based isolation",
        name: "multitenancy",
        "on-select": {
          "continue-step": "tenant-field-selection-step",
        },
      },
    ],
  },
  "tenant-field-selection-step": {
    // In this config user should select a field that contains tenant id
    title: "Tenant field",
    description: "Which payload field should be used as a tenant id?",
    "long-description":
      "This field should be used to filter data based on tenant id. For example: user_id, organization_id, etc. Payload field should be of a `keyword` type.",

    elements: [
      {
        size: 12,
        type: "string-input",
        title: "Tenant field name",
        name: "tenant_id",
        placeholder: "Insert field name here",
        variant: "outlined",
      },
    ],
    button: {
      type: "button",
      title: "Continue",
      "on-click": {
        "continue-step": "templates-selection-step",
      },
    },
  },
  "templates-selection-step": {
    // In this config user should select a template for the index
    title: "What to use for search?",
    description:
      "There are some common configurations used for search, maybe you want to use one of them?",
    cards: [
      {
        title: "Simple Single embedding",
        description:
          "Simplest configuration, only one vector field per document.",
        name: "simple-single-embedding",
        "on-select": {
          "continue-step": "simple-dense-embedding-step",
        },
      },
      {
        title: "Simple Hybrid Search",
        description:
          "Dense + Sparse vectors searched simultaneously. Search covers both semantic and keyword-based search.",
        name: "simple-hybrid-search",
        "on-select": {
          "continue-step": "simple-hybrid-embedding-step",
        },
      },
      {
        title: "Hybrid Search with Late Interaction re-ranking",
        description:
          "Dense + Sparse vectors searched simultaneously. Results are combined and re-ranked using heavy multi-vector model like e.g. ColBERT",
        name: "hybrid-search-late-interaction",
        "on-select": {
          "continue-step": "",
        },
      },
      {
        title: "Visual Latest Interaction",
        description:
          "End-to-end retrieval of PDFs, presentations, images, etc. Collection consists of two multi-vector fields: one compressed for pre-fetch and other for re-ranking.",
        name: "visual-latest-interaction",
        "on-select": {
          "continue-step": "",
        },
      },
      {
        title: "Custom",
        description: "You can define your own configuration.",
        name: "custom",
        "on-select": {
          "continue-step": "",
        },
      },
    ],
  },
  "simple-dense-embedding-step": {
    // In this config user should select a field that contains tenant id
    title: "Vector configuration",
    description: "Configuration for dense embedding",
    elements: [
      {
        type: "group",
        name: "vector_config_group",
        elements: [
          {
            type: "dense-vector-configuration",
            name: "vector_config",
          },
        ],
      },
    ],
    button: {
      type: "button",
      title: "Continue",
      "on-click": {
        "continue-step": "index-field-selection-step",
      },
    },
  },
  "simple-hybrid-embedding-step": {
    // In this config user should select a field that contains tenant id
    title: "Vector configuration",
    description: "Configuration for dense embedding",
    elements: [
      {
        type: "string-input",
        title: "Dense vector name",
        name: "dense_vector_name",
        default: "dense",
        size: 12,
      },
      {
        type: "group",
        name: "vector_config_group",
        elements: [
          {
            type: "dense-vector-configuration",
            name: "dense_vector_config",
          },
        ],
      },
      {
        type: "string-input",
        title: "Sparse vector name",
        name: "sparse_vector_name",
        default: "sparse",
        size: 12,
      },
      {
        type: "group",
        name: "sparse_vector_config_group",
        elements: [
          {
            type: "sparse-vector-configuration",
            name: "sparse_vector_config",
          },
        ],
      },
    ],
    button: {
      type: "button",
      title: "Continue",
      "on-click": {
        "continue-step": "index-field-selection-step",
      },
    },
  },
  "index-field-selection-step": {
    // In this config we let user specify which payload fields should be indexed.
    // User can specify as many fields as they want.
    // For each field user needs to choose which type in index they want and parameters for this index.
    title: "Payload indexes",
    Description: "We need to create indexes, if we want to do filtered search.",
    elements: [
      {
        type: "repeatable",
        name: "payload_fields",
        elements: [
          {
            type: "string-input",
            title: "Field name",
            name: "field_name",
            size: 12,
          },
          {
            type: "button-group-with-inputs",
            title: "Field type",
            name: "field_config",
            size: 12,
            enums: [
              {
                name: "keyword",
              },
              {
                name: "integer",
                fields: [
                  {
                    title: "Allow match filters",
                    name: "lookup",
                    type: "checkbox",
                    default: true,
                  },
                  {
                    title: "Allow range filters",
                    name: "range",
                    type: "checkbox",
                    default: true,
                  },
                ],
              },
              {
                name: "float",
              },
              {
                name: "uuid",
              },
              {
                name: "datetime",
              },
              {
                name: "text",
                fields: [
                  {
                    title: "Tokenizer",
                    name: "tokenizer",
                    type: "dropdown",
                    options: ["prefix", "whitespace", "word", "multilingual"],
                    default: "whitespace",
                  },
                  {
                    title: "Lowercase",
                    name: "lowercase",
                    type: "checkbox",
                    default: true,
                  },
                  {
                    title: "Min token length",
                    name: "min_token_length",
                    type: "number",
                    default: null,
                  },
                  {
                    title: "Max token length",
                    name: "max_token_length",
                    type: "number",
                    default: null,
                  },
                ],
              },
              {
                name: "geo",
              },
              {
                name: "bool",
              },
            ],
          },
        ],
      },
    ],
    button: {
      type: "button",
      title: "Finish",
      "on-click": "finish",
    },
  },
};
