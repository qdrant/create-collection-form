import {
  Autocomplete,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  styled,
} from "@mui/material";
import Card from "@mui/material/Card";
import defaultColors from "./theme/default-colors.js";

export const CCFormRoot = styled("div", {
  name: "MuiCreateCollectionForm",
  slot: "root",
})(({ theme }) => ({
  // if needed, you can access the theme and ownerState here
  padding: "1rem",
  color:
    theme.palette.mode === "dark"
      ? defaultColors["neutral-98"]
      : defaultColors["neutral-10"],
  backgroundColor:
    theme.palette.mode === "dark"
      ? defaultColors["neutral-20"]
      : defaultColors["neutral-98"],

  "& .MuiTypography-root": {
    color:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-98"]
        : defaultColors["neutral-30"],
  },
}));

export const CCFormSelectCard = styled(Card, {
  name: "MuiCreateCollectionForm",
  slot: "selectCard",
})(({ theme }) => {
  // if needed, you can access the theme and ownerState here
  const styles = {
    cursor: "pointer",
    "&.active": {
      cursor: "default",
    },
  };

  if (theme.palette.mode === "dark") {
    styles["&.MuiPaper-root"] = {
      background: defaultColors["neutral-10"],
      border: 0,
      boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-40"]} inset`,
      color: defaultColors["neutral-98"],
      "&.active": {
        border: 0,
        boxShadow: `0px 0px 0px 2px ${defaultColors["neutral-80"]} inset`,
      },
    };
  }
  if (theme.palette.mode === "light") {
    styles["&.MuiPaper-root"] = {
      background: theme.palette.background.default,
      border: "1px solid transparent",
      "&.active": {
        cursor: "default",
        border: `1px solid ${defaultColors["neutral-80"]}`,
      },
    };
  }

  return styles;
});

export const CCFormCard = styled(Card, {
  name: "MuiCreateCollectionForm",
  slot: "card",
})(({ theme, ownerState }) => {
  // if needed, you can access the theme and ownerState here
  // margin: "1rem",
  let styles = {};

  if (theme.palette.mode === "dark") {
    styles = {
      border: `1px solid ${defaultColors["neutral-40"]}`,
      color: defaultColors["neutral-98"],
      "& .MuiTypography-root": {
        color: defaultColors["neutral-98"],
      },
      "&.MuiPaper-root": {
        background: defaultColors["neutral-10"],
        border: 0,
        "&.MuiPaper-outlined": {
          background: defaultColors["neutral-10"],
          boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-80"]} inset`,
        },
        "&.MuiPaper-borders-only": {
          background: defaultColors["neutral-10"],
          border: `1px solid ${defaultColors["neutral-40"]}`,
        },
      },
    };
  }
  if (theme.palette.mode === "light") {
    styles = {
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
      styles.background = `linear-gradient(${defaultColors["neutral-20"]} 0%, rgba(14, 20, 36) 100%)`;
      styles.border = `1px solid ${theme.palette.grey[300]}`;
    }
    if (ownerState?.variant === "outlined") {
      styles.border = `1px solid ${theme.palette.grey[300]}`;
    }
  }
  return styles;
});

export const CCFormButton = styled(Button, {
  name: "MuiCreateCollectionForm",
  slot: "button",
})(({ theme }) => ({
  // if needed, you can access the theme and ownerState here

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
    background: `linear-gradient(180deg, ${defaultColors["primary-50"]} 0%, ${defaultColors["primary-60"]} 100%)`,
    boxShadow: `0px 2px 1px 0px ${defaultColors["primary-60"]} inset`,
    color: defaultColors["neutral-98"],
    "&:hover": {
      background: `linear-gradient(180deg, ${defaultColors["primary-60"]} 0%, ${defaultColors["primary-50"]} 100%)`,
    },
    "&:active": {
      backgroundColor: defaultColors["primary-60"],
      boxShadow: `0px 2px 1px 0px ${defaultColors["primary-60"]} inset`,
    },
    "&:disabled": {
      background: defaultColors["neutral-60"],
      boxShadow: `0px 2px 1px 0px ${defaultColors["neutral-60"]} inset`,
    },
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
}));

export const CCFormControl = styled(FormControl, {
  name: "MuiCreateCollectionForm",
  slot: "formControl",
})(() => ({
  // if needed, you can access the theme and ownerState here
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "1rem",
  marginBottom: "16px",
}));

export const CCFormInputBase = styled(InputBase, {
  name: "MuiCreateCollectionForm",
  slot: "input",
})(({ theme }) => ({
  // if needed, you can access the theme and ownerState here
  "label + &": {
    marginTop: theme.spacing(3),
  },
  display: "flex",
  height: "40px",
  lineHeight: "40px",
  borderBottom: `1px solid ${defaultColors["neutral-70"]}`,
  padding: "8px 0",

  "&.Mui-focused": {
    borderColor:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-80"]
        : defaultColors["neutral-50"],
  },
}));

export const CCFormLabel = styled(InputLabel, {
  name: "MuiCreateCollectionForm",
  slot: "label",
})(({ theme }) => ({
  // if needed, you can access the theme and ownerState here
  fontSize: "1.25rem",
  color:
    theme.palette.mode === "dark"
      ? defaultColors["neutral-80"]
      : defaultColors["neutral-50"],
  lineHeight: "21px",
  "&.Mui-focused": {
    color:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-98"]
        : defaultColors["neutral-30"],
  },
}));

export const CCFormAutoComplete = styled(Autocomplete, {
  name: "MuiCreateCollectionForm",
  slot: "autoComplete",
})(() => ({
  // if needed, you can access the theme and ownerState here
  "&.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot": {
    paddingRight: 0,
  },
  "& .MuiAutocomplete-endAdornment": {
    right: "10px",
  },
}));
