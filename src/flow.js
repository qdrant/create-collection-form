// This file contains a definition of a form flow.
// It contains a list of steps and a list of transitions, with the description of the steps.

export const elements = {
  "dense-vector-configuration": {
    elements: [
      {
        type: "number-with-suggestions",
        title: "Choose dimensions",
        name: "dimensions",
        required: true,
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
        default: false,
        required: false,
        description:
          "This checkbox enables Inverse Document Frequency (IDF) weighting. \n Enabled it if you use BM25 or other models that require IDF.",
        link: "https://qdrant.tech/documentation/concepts/indexing/#idf-modifier",
        linkText: "Learn more",
        size: 12,
      },
    ],
  },
};

// ToDo: Each step except for the last one should have "continue-step".
// If it doesn't have "continue-step", that means we should add one.

export const steps = {
  "collection-name-step": {
    title: "Name your collection",
    // description: "Enter name for your collection",
    useCard: true,
    elements: [
      {
        type: "string-input",
        // title: "Collection name",
        name: "collection_name",
        placeholder: "Example: my-collection",
        required: true,
        size: 12,
        setFocus: true,
      },
      {
        type: "description",
        description:
          "Collection name must be unique and can contain only letters, numbers, hyphens and underscores",
        name: "name_description",
        size: 12,
      },
    ],
    button: {
      type: "button",
      title: "Continue",
      "on-click": {
        "continue-step": "use-case-step",
      },
    },
  },
  "use-case-step": {
    // In this config user should select from 2 cards, which type of search they want to perform
    title: "Create new collection",
    description: "What's your use case?",
    cards: [
      {
        title: "Global search",
        icon: {
          path: "M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H2M12 22C6.47715 22 2 17.5228 2 12M12 22C9.43223 19.3038 8 15.7233 8 12C8 8.27674 9.43223 4.69615 12 2M12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2M2 12C2 6.47715 6.47715 2 12 2",
        },
        size: 6,
        "short-description": "Search across the whole collection",
        description:
          "Search across whole collection of data with optional filters. For example: <ul><li>e-commerce search,</li><li>website search,</li><li>etc.</li></ul>",
        name: "global-search",
        "on-select": {
          "continue-step": "templates-selection-step",
        },
      },
      {
        title: "Multitenancy",
        icon: {
          path: "M12 18.9996L8.03 21.3796C7.71894 21.5665 7.36289 21.6652 7 21.6652C6.63711 21.6652 6.28106 21.5665 5.97 21.3796L2.97 19.5796C2.67476 19.4022 2.43033 19.1516 2.26039 18.852C2.09045 18.5524 2.00075 18.214 2 17.8696V14.6296C2.00075 14.2852 2.09045 13.9468 2.26039 13.6472C2.43033 13.3476 2.67476 13.097 2.97 12.9196L7 10.4996M12 18.9996V13.4996M12 18.9996L15.97 21.3796C16.2811 21.5665 16.6371 21.6652 17 21.6652C17.3629 21.6652 17.7189 21.5665 18.03 21.3796L21.03 19.5796C21.3252 19.4022 21.5697 19.1516 21.7396 18.852C21.9096 18.5524 21.9992 18.214 22 17.8696V14.6296C21.9992 14.2852 21.9096 13.9468 21.7396 13.6472C21.5697 13.3476 21.3252 13.097 21.03 12.9196L17 10.4996M12 13.4996L7 10.4996M12 13.4996L7 16.4996M12 13.4996L17 10.4996M12 13.4996L17 16.4996M12 13.4996V7.9996M7 10.4996V6.1296C7.00075 5.78518 7.09045 5.44678 7.26039 5.14719C7.43033 4.84761 7.67476 4.59698 7.97 4.4196L10.97 2.6196C11.2811 2.43272 11.6371 2.33398 12 2.33398C12.3629 2.33398 12.7189 2.43272 13.03 2.6196L16.03 4.4196C16.3252 4.59698 16.5697 4.84761 16.7396 5.14719C16.9096 5.44678 16.9992 5.78518 17 6.1296V10.4996M7 16.4996L2.26 13.6496M7 16.4996V21.6696M17 16.4996L21.74 13.6496M17 16.4996V21.6696M12 7.9996L7.26 5.1496M12 7.9996L16.74 5.1496",
        },
        size: 6,
        "short-description": "Many tenants, isolated data",
        description:
          "Search across multiple isolated tenants. For example: <ul><li>per-user documents,</li><li>chat history search,</li><li>organization-based isolation</li></ul>",
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
        placeholder: "Example: user-id",
        required: true,
        setFocus: true,
      },
      {
        size: 12,
        type: "description",
        description:
          "This payload field should be used to separate tenants within collection. \n A specuil payload index of type `keyword` will be created for this field. \n All requests to the collection should include this field as a filter.",
        name: "tenant_id_description",
        link: "https://qdrant.tech/documentation/guides/multiple-partitions/",
        linkText: "Multitenancy Documentation",
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
        size: 4,
      },
      {
        title: "Simple Hybrid Search",
        description:
          "Dense + Sparse vectors searched simultaneously. Search covers both semantic and keyword-based search.",
        name: "simple-hybrid-search",
        "on-select": {
          "continue-step": "simple-hybrid-embedding-step",
        },
        size: 4,
      },
      // {
      //   title: "Hybrid Search with Late Interaction re-ranking",
      //   description:
      //     "Dense + Sparse vectors searched simultaneously. Results are combined and re-ranked using heavy multi-vector model like e.g. ColBERT",
      //   name: "hybrid-search-late-interaction",
      //   "on-select": {
      //     "continue-step": "",
      //   },
      // },
      // {
      //   title: "Visual Latest Interaction",
      //   description:
      //     "End-to-end retrieval of PDFs, presentations, images, etc. Collection consists of two multi-vector fields: one compressed for pre-fetch and other for re-ranking.",
      //   name: "visual-latest-interaction",
      //   "on-select": {
      //     "continue-step": "",
      //   },
      // },
      {
        title: "Custom",
        description: "You can define your own configuration.",
        name: "custom",
        "on-select": {
          "continue-step": "custom-collection-dense-step",
        },
        size: 4,
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
        required: true,
        elements: [
          {
            type: "dense-vector-configuration",
            name: "vector_config",
            required: true,
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
    description: "Configuration for dense and sparse embeddings",
    elements: [
      {
        type: "group",
        name: "vector_config_group",
        required: true,
        elements: [
          {
            type: "string-input",
            title: "Dense vector name",
            name: "dense_vector_name",
            variant: "outlined",
            placeholder: "Example: abstract-dense-vector",
            size: 12,
            required: true,
            setFocus: true,
          },
          {
            type: "description",
            description: "Name of the dense vector field",
            link: "https://qdrant.tech/documentation/concepts/vectors/#named-vectors",
            name: "dense_vector_name_description",
            size: 12,
          },
          {
            type: "dense-vector-configuration",
            name: "dense_vector_config",
            required: true,
          },
        ],
      },
      {
        type: "group",
        name: "sparse_vector_config_group",
        required: true,
        elements: [
          {
            type: "string-input",
            title: "Sparse vector name",
            name: "sparse_vector_name",
            variant: "outlined",
            placeholder: "Example: title-sparse-vector",
            size: 12,
            required: true,
          },
          {
            type: "description",
            description: "Name of the sparse vector field",
            link: "https://qdrant.tech/documentation/concepts/vectors/#named-vectors",
            name: "sparse_vector_name_description",
            size: 12,
          },
          {
            type: "sparse-vector-configuration",
            name: "sparse_vector_config",
            required: true,
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
  "custom-collection-dense-step": {
    title: "Custom collection - Dense vectors",
    description: "Configure dense vectors for your collection",
    elements: [
      {
        type: "repeatable",
        name: "custom_dense_vectors",
        maxRepetitions: 3,
        elements: [
          {
            type: "string-input",
            title: "Vector name",
            name: "vector_name",
            variant: "outlined",
            placeholder: "Example: dense-vector",
            size: 12,
            required: true,
            setFocus: true,
          },
          {
            type: "description",
            description: "This name will be used as a name of vector",
            name: "vector_name_description",
            size: 12,
          },
          {
            type: "dense-vector-configuration",
            name: "vector_config",
            required: true,
          },
          {
            type: "details",
            name: "advanced_config",
            title: "Advanced configuration",
            elements: [
              {
                type: "checkbox",
                title: "Multivector",
                name: "multivector",
                default: false,
                size: 6,
              },
              {
                type: "description",
                description:
                  "Create multiple sub-vectors per point. \n Enabled it if you use Late Interraction models like ColBERT, ColPali, e.t.c.",
                name: "multivector_description",
                link: "https://qdrant.tech/documentation/concepts/vectors/#multivectors",
                linkText: "Learn more",
                size: 6,
              },
              {
                type: "enum-slider",
                title: "Storage Tier",
                name: "storage_tier",
                options: ["storage", "balanced", "performance"],
                defaultValue: "balanced",
                size: 6,
              },
              {
                type: "description",
                description:
                  "Storage tier defines how the vector is stored. \n Storage tier is optimized high data volume and low frequency of requests, performance tier is optimized for low latency",
                name: "storage_tier_description",
                size: 6,
              },
              {
                type: "enum-slider",
                title: "Precision Tier",
                name: "precision_tier",
                options: ["low", "medium", "high"],
                defaultValue: "high",
                size: 6,
              },
              {
                type: "description",
                description:
                  "Precision tier defines how vectors are compressed. \n Low precision tier applies quantization, high precision tier doesn't compress vectors",
                name: "precision_tier_description",
                size: 6,
              },
            ],
          },
        ],
      },
    ],
    button: {
      type: "button",
      title: "Continue",
      "on-click": {
        "continue-step": "custom-collection-sparse-step",
      },
    },
  },
  "custom-collection-sparse-step": {
    title: "Custom collection - Sparse vectors",
    description: "Configure sparse vectors for your collection",
    elements: [
      {
        type: "repeatable",
        name: "custom_sparse_vectors",
        maxRepetitions: 3,
        elements: [
          {
            type: "string-input",
            title: "Vector name",
            name: "vector_name",
            placeholder: "Example: sparse-vector",
            size: 12,
            required: true,
            setFocus: true,
          },
          {
            type: "sparse-vector-configuration",
            name: "vector_config",
            required: false,
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
    description: "We need to create indexes, if we want to do filtered search.",
    finish: true,
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
            setFocus: true,
          },
          {
            type: "button-group-with-inputs",
            title: "Field type",
            name: "field_config",
            required: true,
            size: 12,
            enums: [
              {
                name: "keyword",
                fields: [
                  {
                    type: "description",
                    description:
                      'Keyword field index, suitable for exact match of string values. \n Example: <code>color: "red"</code> \n Docs:',
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/payload/#keyword",
                    size: 12,
                  },
                ],
              },
              {
                name: "integer",
                fields: [
                  {
                    type: "description",
                    description:
                      "Integer field index, suitable for exact match and range filters on integer numbers. \n Example: <code>age: 25</code> \n Docs:",
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/payload/#integer",
                    size: 12,
                  },
                  {
                    title: "Allow match filters",
                    name: "lookup",
                    type: "checkbox",
                    default: true,
                    size: 3,
                  },
                  {
                    type: "description",
                    description:
                      "This checkbox enables indexing of the integer field for exact match filters. \n If enabled, index will consume additional memory.",
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
                    description:
                      "This checkbox enables indexing of the integer field for exact match filters. \n If enabled, index will consume additional memory.",
                    link: "https://qdrant.tech/documentation/concepts/indexing/#parameterized-index",
                    linkText: "Learn more",
                    name: "range_description",
                    size: 9,
                  },
                ],
              },
              {
                name: "float",
                fields: [
                  {
                    type: "description",
                    description:
                      "Float field index, suitable for range filters on floating point and integer numbers. \n Example: <code>price: 99.5</code> \n Docs:",
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/payload/#float",
                    size: 12,
                  },
                ],
              },
              {
                name: "uuid",
                fields: [
                  {
                    type: "description",
                    description:
                      'UUID field index, suitable for exact match of UUID values. Similar to keyword field, optimized for UUID values. \n Example: <code>doc_id: "123e4567-e89b-12d3-a456-426614174000"</code> \n Docs:',
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/payload/#uuid",
                    size: 12,
                  },
                ],
              },
              {
                name: "datetime",
                fields: [
                  {
                    type: "description",
                    description:
                      'Datetime field index, suitable for range filters on datetime values. \n Example: <code>created_at: "2023-02-08T10:49:00Z"</code> \n Docs:',
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/payload/#datetime",
                    size: 12,
                  },
                ],
              },
              {
                name: "text",
                fields: [
                  {
                    type: "description",
                    description:
                      'Text field index, suitable for full-text filtering on string values. \n Example: <code>title: "The Last Question"</code> \n Docs:',
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/filtering/#full-text-match",
                    size: 12,
                  },
                  {
                    title: "Tokenizer",
                    name: "tokenizer",
                    type: "dropdown",
                    options: ["prefix", "whitespace", "word", "multilingual"],
                    default: "whitespace",
                    size: 12,
                  },
                  {
                    type: "description",
                    description: "Defines how the text is tokenized",
                    link: "https://qdrant.tech/documentation/concepts/indexing/#full-text-index",
                    linkText: "Learn more",
                    name: "tokenizer_description",
                    size: 12,
                  },
                  {
                    title: "Lowercase",
                    name: "lowercase",
                    type: "checkbox",
                    default: true,
                    description: "Converts all characters to lowercase",
                    link: "https://qdrant.tech/documentation/concepts/indexing/#full-text-index",
                    linkText: "Learn more",
                    size: 6,
                  },
                  {
                    title: "Phrase matching",
                    name: "phrase_matching",
                    type: "checkbox",
                    default: true,
                    description: "Allows phrase matching at the cost of extra index structure",
                    link: "https://qdrant.tech/documentation/concepts/filtering/#phrase-matching",
                    linkText: "Learn more",
                    size: 6,
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
              {
                name: "geo",
                fields: [
                  {
                    type: "description",
                    description:
                      'Geo field index, suitable for geospatial filtering on latitude and longitude values. \n Example: <code>location: { "lon": 52.5200, "lat": 13.4050 }</code> \n Docs:',
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/payload/#geo",
                    size: 12,
                  },
                ],
              },
              {
                name: "bool",
                fields: [
                  {
                    type: "description",
                    description:
                      "Boolean field index, suitable for exact match of boolean values. \n Example: <code>is_active: true</code> \n Docs:",
                    linkText: "Learn more",
                    link: "https://qdrant.tech/documentation/concepts/payload/#bool",
                    size: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
