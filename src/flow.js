// This file contains a definition of a form flow.
// It contains a list of steps and a list of transitions, with the descprion of the steps.

export const elements = {
  "dense-vector-configuration": {
    groups: [
      {
        variant: "borders-only",
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
    ],
  },
  "sparse-vector-configuration": {
    groups: [
      {
        variant: "borders-only",
        elements: [
          {
            type: "checkbox",
            title: "Use IDF?",
            name: "use_idf",
            default: true,
          },
        ],
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
    cards: [
      {
        title: "Global search",
        description:
          "Search across whole collection of data with optional filters. For example: e-commerce search, website search, etc.",
        name: "global-search",
        "on-select": {
          "continue-step": "templates-selection-step",
        },
      },
      {
        title: "Multitenancy",
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

    groups: [
      {
        variant: "borders-only",
        elements: [
          {
            type: "string-input",
            title: "Tenant field name",
            name: "tenant_id",
          },
        ],
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
    groups: [
      {
        variant: "borders-only",
        elements: [
          {
            type: "string-input",
            title: "Vector name",
            name: "vector_name",
            default: "dense",
          },
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
    groups: [
      {
        variant: "outlined",
        elements: [
          {
            type: "string-input",
            title: "Dense vector name",
            name: "dense_vector_name",
            default: "dense",
          },
        ],
      },
      {
        variant: "outlined",
        elements: [
          {
            type: "dense-vector-configuration",
            name: "dense_vector_config",
          },
          {
            type: "string-input",
            title: "Sparse vector name",
            name: "sparse_vector_name",
            default: "sparse",
          },
        ],
      },
      {
        variant: "outlined",
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
    groups: [
      {
        elements: [
          {
            type: "repeatable",
            name: "payload_fields",
            elements: [
              {
                type: "string-input",
                title: "Field name",
                name: "field_name",
              },
              {
                type: "button-group-with-inputs",
                title: "Field type",
                name: "field_config",
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
                        options: [
                          "prefix",
                          "whitespace",
                          "word",
                          "multilingual",
                        ],
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
      },
    ],
    button: {
      type: "button",
      title: "Finish",
      "on-click": "finish",
    },
  },
};
