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
        size: 6,
      },
      {
        type: "description",
        description:
          "This checkbox enables Inverse Document Frequency (IDF) weighting. \n Enabled it if you use BM25 or other models that require IDF.",
        link: "https://qdrant.tech/documentation/concepts/indexing/#idf-modifier",
        linkText: "Learn more",
        name: "use_idf_description",
        size: 6,
      },
    ],
  },
};

// ToDo: Each step except for the last one should have "continue-step".
// If it doesn't have "continue-step", that means we should add one.

export const steps = {
  "collection-name-step": {
    title: "Collection name",
    description: "Enter name for your collection",
    elements: [
      {
        type: "string-input",
        title: "Collection name",
        name: "collection_name",
        placeholder: "my-collection",
        required: true,
        size: 6,
      },
      {
        type: "description",
        description:
          "Collection name must be unique and can contain only letters, numbers, hyphens and underscores",
        name: "name_description",
        size: 6,
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
        icon: {
          path: "M 12 0.001953125 C 9.3612104 -0.035285308 6.794465 1.5829041 5.7597656 4.0253906 C 2.7352486 3.7509055 -0.087524872 6.4772791 0 9.5 C -0.079277631 12.466125 2.6044748 15.114122 5.5683594 15 C 5.7115912 14.999678 5.8548131 15.000243 5.9980469 15 C 5.9983936 15.028079 5.9999517 15.058771 6 15.085938 C 5.965374 15.594176 6.0667898 16.160075 5.9511719 16.634766 L 4.2910156 18.294922 C 3.8903449 18.102027 3.4462729 17.997769 3 18 C 1.0625646 17.93387 -0.51223666 20.05439 0.13671875 21.888672 C 0.63700985 23.69233 2.979798 24.602621 4.5507812 23.5625 C 5.8835279 22.817353 6.3364831 21.028925 5.7128906 19.701172 C 6.4420251 18.921792 7.2903005 18.240663 7.9238281 17.382812 C 8.0424524 16.597831 8.0088956 15.797936 7.9960938 15 C 8.9968236 15.000244 9.9972951 15.000795 10.998047 15.001953 C 10.99838 15.029375 10.999953 15.059388 11 15.085938 L 11 18.164062 C 9.5678216 18.68957 8.6046289 20.384702 9.1367188 21.888672 C 9.6370073 23.692337 11.979796 24.60263 13.550781 23.5625 C 15.187179 22.647573 15.498298 20.159094 14.117188 18.882812 C 13.803444 18.566538 13.418388 18.324069 13 18.173828 C 12.988792 17.117067 13.008486 16.058868 13 15.001953 C 13.999222 15.002387 14.998899 15.000689 15.998047 14.998047 C 15.998407 15.026783 15.999951 15.058153 16 15.085938 C 16.03363 15.85065 15.922512 16.629932 16.076172 17.382812 C 16.724192 18.236968 17.551463 18.943129 18.304688 19.710938 C 17.973121 20.376972 17.877622 21.156326 18.136719 21.888672 C 18.637008 23.692337 20.979796 24.60263 22.550781 23.5625 C 24.187179 22.647573 24.498298 20.159094 23.117188 18.882812 C 22.563776 18.324938 21.787133 17.996064 21 18 C 20.539254 17.984273 20.099847 18.092753 19.705078 18.291016 L 18 16.585938 C 17.99111 16.053732 18.000819 15.52105 18.001953 14.988281 C 18.304102 14.986457 18.606068 14.986769 18.908203 14.984375 C 21.849848 14.845728 24.274955 12.01481 23.984375 9.0917969 C 23.845706 6.2212638 21.114296 3.7711045 18.240234 4.0253906 C 17.181936 1.5640043 14.6643 -0.020261243 12 0.001953125 z M 12 2.0019531 C 14.091462 1.9709412 16.092704 3.4106759 16.730469 5.4023438 C 17.570637 6.5780874 19.365528 5.5428379 20.441406 6.5878906 C 22.251898 7.7095713 22.530672 10.520278 20.974609 11.974609 C 20.082458 12.952854 18.719977 13.059642 17.482422 13 C 17.323578 12.999565 17.164707 13.000307 17.005859 13 C 17.003877 13.000019 17.001984 12.999968 17 13 L 16.998047 13 C 15.360094 12.996855 13.722102 12.999763 12.083984 13.001953 C 12.055842 12.999758 12.028447 12.999545 12 13 C 11.991948 13.000336 11.984488 13.001504 11.976562 13.001953 C 9.7023415 13.004923 7.4277454 13.004413 5.1542969 12.982422 C 3.0311564 12.842516 1.4632104 10.496941 2.1503906 8.4824219 C 2.6167664 6.8251517 4.4398627 5.7014217 6.1289062 6.0644531 C 7.6846691 5.8224586 7.63979 3.6079074 9.0878906 2.9394531 C 9.9289299 2.3321233 10.96267 1.9997691 12 2.0019531 z M 2.9101562 20 C 2.9392669 19.998844 2.9697728 19.998439 3 20 C 4.7172265 19.989839 3.8706744 22.799979 2.4355469 21.832031 C 1.6520959 21.342817 2.0077263 20.035848 2.9101562 20 z M 11.910156 20 C 11.939267 19.998845 11.969772 19.998438 12 20 C 13.717243 19.98982 12.870701 22.800008 11.435547 21.832031 C 10.652124 21.342814 11.007714 20.03582 11.910156 20 z M 20.910156 20 C 20.939267 19.998845 20.969772 19.998438 21 20 C 22.717243 19.98982 21.870701 22.800008 20.435547 21.832031 C 19.652124 21.342814 20.007714 20.03582 20.910156 20 z",
        },
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
        size: 6,
        type: "string-input",
        title: "Tenant field name",
        name: "tenant_id",
        placeholder: "Example: user-id",
        required: true,
      },
      {
        size: 6,
        type: "description",
        description:
          "This payload field should be used to separate tenants within collection. \n A specuil payload index of type `keyword` will be created for this field. \n All requests to the collection should include this field as a filter.",
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
            size: 6,
            required: true,
          },
          {
            type: "description",
            description: "Name of the dense vector field",
            link: "https://qdrant.tech/documentation/concepts/vectors/#named-vectors",
            name: "dense_vector_name_description",
            size: 6,
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
        elements: [
          {
            type: "string-input",
            title: "Sparse vector name",
            name: "sparse_vector_name",
            variant: "outlined",
            placeholder: "Example: title-sparse-vector",
            size: 6,
            required: true,
          },
          {
            type: "description",
            description: "Name of the sparse vector field",
            link: "https://qdrant.tech/documentation/concepts/vectors/#named-vectors",
            name: "sparse_vector_name_description",
            size: 6,
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
            size: 6,
            required: true,
          },
          {
            type: "description",
            description: "This name will be used as a name of vector",
            name: "vector_name_description",
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
          },
          {
            type: "sparse-vector-configuration",
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
              },
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
                    name: "min_token_length",
                    type: "number",
                    min: 1,
                  },
                  {
                    title: "Max token length",
                    name: "max_token_length",
                    type: "number",
                    min: 1,
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
};
