import defaultColors from "./default-colors.js";

const commonComponentsStyleOverrides = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => {
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
            color: theme.palette.primary.contrastText,
            background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%))`,
            boxShadow: "0px 2px 1px 0px #FF516B inset",
            fontWeight: "semibold",
            fontSize: "18px",
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
            },
          },
        };
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          "label + &": {
            marginTop: theme.spacing(3),
          },
          "& .MuiInputBase-input": {
            display: "flex",
            height: "40px",
            lineHeight: "40px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.grey[500]}`,
            padding: "8px 16px",
          },
          "&.Mui-focused": {
            "& .MuiInputBase-input": {
              borderColor: theme.palette.grey[900],
              boxShadow: `0px 0px 0px 1px ${theme.palette.grey[600]}`,
            },
          },
        };
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "1rem",
        marginBottom: "16px",
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          color: theme.palette.text.secondary,
          lineHeight: "21px",
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
        };
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        "&.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot": {
          paddingRight: 0,
        },
        "& .MuiAutocomplete-endAdornment": {
          right: "10px",
        },
      },
    },
  },
};

export const defaultTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: defaultColors["primary-60"],
          main: defaultColors["primary-50"],
          dark: defaultColors["primary-40"],
          contrastText: defaultColors["neutral-98"],
        },
        secondary: {
          main: defaultColors["secondary-blue-50"],
        },
        success: {
          main: defaultColors["success-50"],
        },
        info: {
          main: defaultColors["secondary-blue-70"],
        },
        warning: {
          main: defaultColors["warning-50"],
        },
        error: {
          main: defaultColors["error-50"],
        },
        grey: {
          50: defaultColors["neutral-10"],
          100: defaultColors["neutral-20"],
          200: defaultColors["neutral-30"],
          300: defaultColors["neutral-40"],
          400: defaultColors["neutral-50"],
          500: defaultColors["neutral-60"],
          600: defaultColors["neutral-70"],
          700: defaultColors["neutral-80"],
          800: defaultColors["neutral-90"],
          900: defaultColors["neutral-100"],
        },
        background: {
          default: defaultColors["neutral-94"],
          paper: defaultColors["neutral-98"],
        },
        text: {
          primary: defaultColors["neutral-10"],
          secondary: defaultColors["neutral-50"],
        },
      },
      components: {
        ...commonComponentsStyleOverrides,
        MuiCard: {
          styleOverrides: {
            root: ({ theme, ownerState }) => {
              if (ownerState?.variant === "borders-only") {
                return {
                  background: "transparent",
                  border: `1px solid ${theme.palette.grey[800]}`,
                };
              }
              if (ownerState?.variant === "outlined") {
                return {
                  background: theme.palette.background.default,
                  border: `1px solid ${theme.palette.grey[800]}`,
                };
              }
              return {
                background: theme.palette.background.default,
                border: `1px solid ${theme.palette.grey[800]}`,
              };
            },
          },
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: defaultColors["primary-60"],
          main: defaultColors["primary-50"],
          dark: defaultColors["primary-40"],
          contrastText: defaultColors["neutral-98"],
        },
        secondary: {
          main: defaultColors["secondary-blue-50"],
        },
        success: {
          main: defaultColors["success-50"],
        },
        info: {
          main: defaultColors["secondary-blue-70"],
        },
        warning: {
          main: defaultColors["warning-50"],
        },
        error: {
          main: defaultColors["error-50"],
        },
        grey: {
          50: defaultColors["neutral-10"],
          100: defaultColors["neutral-20"],
          200: defaultColors["neutral-30"],
          300: defaultColors["neutral-40"],
          400: defaultColors["neutral-50"],
          500: defaultColors["neutral-60"],
          600: defaultColors["neutral-70"],
          700: defaultColors["neutral-80"],
          800: defaultColors["neutral-90"],
          900: defaultColors["neutral-100"],
        },
        background: {
          default: defaultColors["neutral-10"],
          paper: defaultColors["neutral-20"],
        },
        text: {
          primary: defaultColors["neutral-98"],
          secondary: defaultColors["neutral-70"],
        },
      },
      components: {
        ...commonComponentsStyleOverrides,
        MuiCard: {
          styleOverrides: {
            root: ({ theme, ownerState }) => {
              if (ownerState?.variant === "borders-only") {
                return {
                  background: "transparent",
                  border: `1px solid ${theme.palette.grey[300]}`,
                };
              }
              if (ownerState?.variant === "outlined") {
                return {
                  background: `linear-gradient(${theme.palette.grey[100]} 0%, rgba(14, 20, 36) 100%)`,
                  border: `1px solid ${theme.palette.grey[300]}`,
                };
              }
              return {
                background: `linear-gradient(${theme.palette.grey[100]} 0%, rgba(14, 20, 36) 100%)`,
                border: `1px solid ${theme.palette.grey[300]}`,
              };
            },
          },
        },
      },
    },
  },
};
