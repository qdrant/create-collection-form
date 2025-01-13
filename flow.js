// This file contains a definition of a form flow.
// It contains a list of steps and a list of transitions, with the descprion of the steps.



const steps = {
    "use-case-step": {
        // In this step user should select from 2 cards, which type of search they want to perform
        "title": "Create new collection",
        "description": "What's your use case?",
        "cards": [
            {
                "title": "Global search",
                "Description": "Search across whole collection of data with optional filters. For example: e-commerce search, website search, etc.",
                "on-select": {
                    "continue-step": "tenant-field-selection-step"
                }
            },
            {
                "title": "Multitenancy",
                "Description": "Search across multiple isolated tenants. For example: per-user documents, chat history search, organization-based isolation",
            }
        ]
    },
    "tenant-field-selection-step": {
        // In this step user should select a field that contains tenant id
        "title": "Tenant field",
        "description": "Which payload field should be used as a tenant id?",
        "long-description": "This field should be used to filter data based on tenant id. For example: user_id, organization_id, etc. Payload field should be of a `keyword` type.",
        "elements": [
            {
                "type": "string-input",
                "name": "tenant_id",
            },
            {
                "type": "button",
                "title": "Continue",
                "on-click": {
                    "continue-step": "index-field-selection-step"
                }
            }

        ],
    },
    "templates-selection-step": {
        // In this step user should select a template for the index
        "title": "What to use for search?",
        "description": "There are some common configurations used for search, maybe you want to use one of them?",
        "cards": [
            {
                "title": "Simple Single embedding",
                "description": "Simplest configuration, only one vector field per document.",
            },
            {
                "title": "Simple Hybrid Search",
                "description": "Dense + Sparse vectors searched simultaneously. Search covers both semantic and keyword-based search.",
            },
            {
                "title": "Hybrid Search with Late Interaction re-ranking",
                "description": "Dense + Sparse vectors searched simultaneously. Results are combined and re-ranked using heavy multi-vector model like e.g. ColBERT",
            },
            {
                "title": "Visual Latest Interaction",
                "description": "End-to-end retrieval of PDFs, presentations, images, etc. Collection consists of two multi-vector fields: one compressed for pre-fetch and other for re-ranking.",
            },
            {
                "title": "Custom",
                "description": "You can define your own configuration.",
            }
        ]
    },
    "simple-dense-embedding-step": {
        // In this step user should select a field that contains tenant id
        "title": "Vector configuration",
        "description": "Configuration for dense embedding",
        "elements": [
            {
                "type": "number-with-suggestions",
                "name": "dimensions",
                "suggestions": [
                    {
                        "label": "CLIP",
                        "value": 512
                    },
                    {
                        "label": "openai-ai/text-embedding-3-small",
                        "value": 1536
                    },
                    {
                        "label": "openai-ai/text-embedding-3-large",
                        "value": 3072
                    }
                ]
            },
            {
                "type": "dropdown",
                "name": "metric",
                "options": [ "Cosine", "Euclid", "Dot", "Manhattan" ],
                "default": "Cosine"
            },
            {
                "type": "button",
                "title": "Continue",
                "on-click": {
                    "continue-step": "index-field-selection-step"
                }
            }
        ],
    },
    "index-field-selection-step": {
        // In this step we let user specify which payload fields should be indexed.
        // User can specify as many fields as they want.
        // For each field user needs to choose which type in index they want and parameters for this index.
        "title": "Payload indexes",
        "Description": "We need to create indexes, if we want to do filtered search.",
    }
}