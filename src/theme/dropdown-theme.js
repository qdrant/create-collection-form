import defaultColors from "./default-colors.js";

export const muiMenuTheme = {
  styleOverrides: {
    paper: ({ theme }) => {
      const styles = {
        backgroundColor:
          theme.palette.mode === "dark"
            ? defaultColors["neutral-20"]
            : defaultColors["neutral-100"],
        backgroundImage: "none",
        border: `1px solid ${theme.palette.mode === "dark" ? defaultColors["neutral-30"] : defaultColors["neutral-90"]}`,
      };
      return styles;
    },
  },
};
export const muiMenuItemTheme = {
  styleOverrides: {
    root: ({ theme }) => {
      const styles = {
        color:
          theme.palette.mode === "dark"
            ? defaultColors["neutral-98"]
            : defaultColors["neutral-30"],
        "&.Mui-selected": {
          color:
            theme.palette.mode === "dark"
              ? defaultColors["neutral-90"]
              : defaultColors["neutral-10"],
        },
        "&:hover": {
          color:
            theme.palette.mode === "dark"
              ? defaultColors["neutral-98"]
              : defaultColors["neutral-30"],
        },
      };
      return styles;
    },
  },
};

export const dropdownTheme = {
  MuiMenu: muiMenuTheme,
  MuiAutocomplete: muiMenuTheme,
  MuiMenuItem: muiMenuItemTheme,
};
