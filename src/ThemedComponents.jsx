import {
  Autocomplete,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  Typography,
  styled,
  Checkbox,
} from "@mui/material";
import Card from "@mui/material/Card";
import defaultColors from "./theme/default-colors.js";

export const CCFormRoot = styled("div", {
  name: "MuiCreateCollectionForm",
  slot: "root",
})(({ theme }) => ({
  padding: "1rem",
  color:
    theme.palette.mode === "dark"
      ? defaultColors["neutral-98"]
      : defaultColors["neutral-10"],
  backgroundColor:
    theme.palette.mode === "dark"
      ? defaultColors["neutral-10"]
      : defaultColors["neutral-98"],

  "& > .MuiTypography-root": {
    color:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-98"]
        : defaultColors["neutral-30"],
  },
}));

export const CCFormTitle = styled(
  (props) => <Typography variant="h6" component="h2" {...props} />,
  {
    name: "MuiCreateCollectionForm",
    slot: "title",
  },
)(() => ({
  color: `${defaultColors["primary-50"]} !important`,
}));

export const CCFormSelectCard = styled(Card, {
  name: "MuiCreateCollectionForm",
  slot: "selectCard",
})(({ theme }) => {
  const styles = {
    padding: "0.5rem 0.25rem 1.25rem",
    cursor: "pointer",
    "&.active": {
      cursor: "default",
    },
    "& .MuiCardContent-root .MuiDivider-root ~ .MuiTypography-root": {
      lineHeight: 2,
    },
  };

  if (theme.palette.mode === "dark") {
    styles["&.MuiPaper-root"] = {
      background: defaultColors["neutral-20"],
      border: 0,
      boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-40"]} inset`,
      color: defaultColors["neutral-80"],
      "&:hover": {
        boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-80"]} inset`,
      },
      "&.active": {
        border: 0,
        boxShadow: `0px 0px 0px 2px ${defaultColors["neutral-80"]} inset`,
        color: defaultColors["neutral-98"],
        "& .MuiCardContent-root .MuiTypography-root": {
          color: defaultColors["neutral-98"],
        },
      },
      "&:not(.active)": {
        "& .MuiCardContent-root .MuiTypography-root": {
          color: `${defaultColors["neutral-80"]} !important`,
        },
      },
      "& .MuiCardContent-root .MuiTypography-root": {
        color: defaultColors["neutral-98"],
      },
      "& .CCFormSelectCard-Title": {
        fontWeight: "bold",
        color: `${defaultColors["neutral-80"]} !important`,
      },
    };
  }
  if (theme.palette.mode === "light") {
    styles["&.MuiPaper-root"] = {
      background: theme.palette.background.default,
      boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-90"]} inset`,
      border: 0,
      "&:hover": {
        boxShadow: `0px 0px 0px 1px ${defaultColors["secondary-blue-30"]} inset`,
      },
      "&.active": {
        cursor: "default",
        border: 0,
        boxShadow: `0px 0px 0px 2px ${defaultColors["secondary-blue-30"]} inset`,
      },
      "&:not(.active)": {
        "& .MuiCardContent-root .MuiTypography-root": {
          color: `${defaultColors["neutral-50"]}`,
          "&.CCFormSelectCard-Title": {
            color: `${defaultColors["secondary-blue-30"]}`,
          },
        },
      },
      "& .MuiCardContent-root .MuiTypography-root": {
        color: defaultColors["neutral-30"],
      },
      "& .CCFormSelectCard-Title": {
        color: `${defaultColors["secondary-blue-30"]}`,
      },
    };
  }

  return styles;
});

export const CCFormCard = styled(Card, {
  name: "MuiCreateCollectionForm",
  slot: "card",
})(({ theme }) => {
  let styles = {};

  if (theme.palette.mode === "dark") {
    styles = {
      "& .MuiTypography-root": {
        color: defaultColors["neutral-98"],
      },
      "&.MuiPaper-root": {
        backgroundColor: defaultColors["neutral-20"],
        border: 0,
        boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-80"]} inset`,
        color: defaultColors["neutral-98"],
      },
    };
  }
  if (theme.palette.mode === "light") {
    styles = {
      "& .MuiTypography-root": {
        color: defaultColors["neutral-30"],
      },
      "&.MuiPaper-root": {
        backgroundColor: theme.palette.background.default,
        border: 0,
        boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-80"]} inset`,
        color: defaultColors["neutral-30"],
      },
    };
  }
  return styles;
});

export const CCFormButton = styled(Button, {
  name: "MuiCreateCollectionForm",
  slot: "button",
})(({ theme }) => ({
  textTransform: "capitalize",
  fontWeight: "semibold",
  fontSize: "18px",
  color: defaultColors["primary-50"],
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

  "&:hover": {
    "&.MuiButton-text": {
      background: "transparent",
      color:
        theme.palette.mode === "dark"
          ? defaultColors["neutral-100"]
          : defaultColors["primary-60"],
    },
  },
}));

export const CCFormControl = styled(FormControl, {
  name: "MuiCreateCollectionForm",
  slot: "formControl",
})(() => ({
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
  display: "flex",
  height: "40px",
  lineHeight: "40px",
  borderBottom: `1px solid ${defaultColors["neutral-70"]}`,
  padding: "8px 0",

  "&[variant='outlined']": {
    border: `1px solid ${defaultColors["neutral-40"]}`,
    borderColor:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-40"]
        : defaultColors["neutral-90"],
    borderRadius: "4px",
    padding: "8px 12px",
    backgroundColor:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-20"]
        : theme.palette.background.default,
  },

  "&.Mui-focused": {
    borderColor:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-80"]
        : defaultColors["neutral-50"],
  },

  "&.Mui-disabled": {
    color:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-80"]
        : defaultColors["neutral-50"],
  },
  // placeholder
  "& input::placeholder": {
    color:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-80"]
        : defaultColors["neutral-50"] + " !important",
  },

  "label + &": {
    marginTop: theme.spacing(3),
  },
}));

export const CCFormCheckbox = styled(Checkbox, {
  name: "MuiCreateCollectionForm",
  slot: "checkbox",
})(() => ({
  color: defaultColors["primary-50"],
  "&.MuiCheckbox-colorPrimary": {
    color: defaultColors["primary-50"],
    "&.Mui-checked": {
      color: defaultColors["primary-50"],
    },
  },
}));

export const CCFormLabel = styled(InputLabel, {
  name: "MuiCreateCollectionForm",
  slot: "label",
})(({ theme }) => ({
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
  "&.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot": {
    paddingRight: 0,
  },
  "& .MuiAutocomplete-endAdornment": {
    right: "10px",
  },
}));
