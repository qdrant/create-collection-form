import defaultColors from "./default-colors.js";

const overrides = {
  button: ({ theme }) => {
    return {
      textTransform: "capitalize",
      fontWeight: "semibold",
      fontSize: "18px",
      "&.MuiButton-contained": {
        display: "flex",
        height: "40px",
        padding: "8px 22px",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        fontWeight: "semibold",
        fontSize: "18px",
        background: "linear-gradient(180deg, #dc244c 0%, #ff516b 100%)",
        boxShadow: "0px 2px 1px 0px #FF516B inset",
      },
      "& .MuiButton-icon": {
        marginTop: "-3px",
      },
      "&.MuiButton-text": {},
      // hover
      "&:hover": {
        "&.MuiButton-text": {
          background: "transparent",
          color: theme.palette.primary.light,
          backgroundColor: defaultColors["neutral-20"],
        },
      },
    };
  },

  formControl: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "1rem",
    marginBottom: "16px",
  },

  input: ({ theme }) => {
    return {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      display: "flex",
      height: "40px",
      lineHeight: "40px",
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
      padding: "8px 0",
    };
  },

  label: ({ theme }) => {
    return {
      color: theme.palette.text.secondary,
      lineHeight: "21px",
      "&.Mui-focused": {
        color: theme.palette.text.primary,
      },
    };
  },

  autoComplete: {
    "&.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot": {
      paddingRight: 0,
    },
    "& .MuiAutocomplete-endAdornment": {
      right: "10px",
    },
  },
};

export const CreateCollectionFormTheme = {
  colorSchemes: {
    dark: {
      components: {
        "& .MuiTypography-root": {
          color: defaultColors["neutral-98"],
        },
        MuiCreateCollectionForm: {
          styleOverrides: {
            ...overrides,
            root: {
              color: defaultColors["neutral-98"],
              backgroundColor: defaultColors["neutral-10"],
            },

            selectCard: () => {
              return {
                "&.MuiPaper-root": {
                  background: `linear-gradient(${defaultColors["neutral-20"]} 0%, rgba(14, 20, 36) 100%)`,
                  border: `1px solid ${defaultColors["neutral-40"]}`,
                  color: defaultColors["neutral-98"],
                  "&.active": {
                    border: `1px solid ${defaultColors["neutral-80"]}`,
                  },
                },
              };
            },

            card: {
              border: `1px solid ${defaultColors["neutral-40"]}`,
              color: defaultColors["neutral-98"],
              "& .MuiTypography-root": {
                color: defaultColors["neutral-98"],
              },
              "&.MuiPaper-root": {
                background: defaultColors["neutral-10"],
                "&.MuiPaper-outlined": {
                  background: `linear-gradient(${defaultColors["neutral-20"]} 0%, rgba(14, 20, 36) 100%)`,
                  border: `1px solid ${defaultColors["neutral-40"]}`,
                },
                "&.MuiPaper-borders-only": {
                  background: defaultColors["neutral-10"],
                  border: `1px solid ${defaultColors["neutral-40"]}`,
                },
              },
            },

            button: ({ theme }) => {
              return {
                ...overrides.button({ theme }),
                "&.MuiButton-contained": {
                  ...overrides.button({ theme })["&.MuiButton-contained"],
                  color: defaultColors["neutral-98"],
                },
              };
            },
            input: ({ theme }) => {
              return {
                ...overrides.input({ theme }),
                "&.Mui-focused": {
                  borderColor: theme.palette.grey[200],
                },
              };
            },
            // label: {},
            // autoComplete: {},
          },
        },
      },
    },
    light: {
      components: {
        "& .MuiTypography-root": {
          color: defaultColors["neutral-30"],
        },
        MuiCreateCollectionForm: {
          styleOverrides: {
            ...overrides,
            root: {
              color: defaultColors["neutral-10"],
              backgroundColor: defaultColors["neutral-98"],
            },
            selectCard: ({ theme }) => {
              return {
                "&.MuiPaper-root": {
                  background: theme.palette.background.default,
                  border: "1px solid transparent",
                  "&.active": {
                    cursor: "default",
                    border: `1px solid ${defaultColors["neutral-80"]}`,
                  },
                },
              };
            },
            card: ({ theme, ownerState }) => {
              let styles = {
                "& .MuiTypography-root": {
                  color: defaultColors["neutral-30"],
                },
                "&.MuiPaper-root": {
                  backgroundColor: defaultColors["neutral-98"],
                },
                background: `linear-gradient(${defaultColors["neutral-98"]} 0%, ${defaultColors["neutral-94"]} 100%)`,
                border: `1px solid ${defaultColors["neutral-80"]}`,
                color: defaultColors["neutral-30"],
              };
              if (ownerState?.variant === "borders-only") {
                return {
                  ...styles,
                  background: `linear-gradient(${defaultColors["neutral-20"]} 0%, rgba(14, 20, 36) 100%)`,
                  border: `1px solid ${theme.palette.grey[300]}`,
                };
              }
              if (ownerState?.variant === "outlined") {
                return {
                  ...styles,
                  border: `1px solid ${theme.palette.grey[300]}`,
                };
              }
              return styles;
            },
            button: ({ theme }) => {
              return {
                ...overrides.button({ theme }),
              };
            },
            input: ({ theme }) => {
              return {
                ...overrides.input({ theme }),
                "&.Mui-focused": {
                  borderColor: theme.palette.grey[600],
                },
              };
            },
            // label: {},
            // autoComplete: {},
          },
        },
      },
    },
  },
};
