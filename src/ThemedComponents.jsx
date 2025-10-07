/* eslint-disable no-unused-vars */
import {
  Accordion,
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  InputBase,
  InputLabel,
  Paper,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import defaultColors from "./theme/default-colors.js";
import { alpha } from "@mui/material/styles";

export const CCFormRoot = styled("div", {
  name: "MuiCreateCollectionForm",
  slot: "root",
})(({ theme }) => {
  console.log(theme);
  return {
    position: "relative",
    padding: "1rem",
    paddingTop: "2rem",
    minHeight: "100%",
    flex: 1,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,

    // "& > .MuiTypography-root": {
    //   color:
    //     theme.palette.mode === "dark"
    //       ? defaultColors["neutral-98"]
    //       : defaultColors["neutral-30"],
    // },
    // "& > .MuiContainer-root": {
    //   "@media (min-width: 900px) and (max-width: 2144px)": {
    //     paddingRight: "clamp(200px, 25vw, 300px) !important",
    //   },
    //   [theme.breakpoints.down("md")]: {
    //     paddingBottom: "200px",
    //   },
    // },
  };
});

export const CCFormTitle = styled(
  (props) => <Typography variant="h5" component="h2" {...props} />,
  {
    name: "MuiCreateCollectionForm",
    slot: "title",
  },
)(({ theme }) => ({
  // background: theme.palette.background?.paperElevation1,
  // fontSize: "inherit",
  // fontWeight: "inherit",
  // color: "inherit",
}));

export const CCFormSelectCard = styled(
  (props) => <Card elevation={0} {...props} />,
  {
    name: "MuiCreateCollectionForm",
    slot: "selectCard",
  },
)(({ theme }) => {
  const styles = {
    width: "100%",
    p: 3,
    boxShadow: "none",
    boxSizing: "border-box",
    borderRadius: "8px",
    transition: "all 0.1s ease-in-out",
    "& svg": {
      stroke: theme.palette.text.primary,
      fill: "none",
      strokeWidth: "1.5",
    },
    "& ul": {
      paddingLeft: "0",
      marginBottom: "0",
      listStyleType: "none",
      "& li": {
        paddingLeft: "28px",
        position: "relative",
        "&:not(:last-child)": {
          marginBottom: "10px",
        },
        "&:before": {
          content: '""',
          position: "absolute",
          left: "0",
          top: "2px",
          width: "20px",
          height: "21px",
          display: "inline-block",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'%3E%3Cpath d='M16.6668 5.5L7.50016 14.6667L3.3335 10.5' stroke='${encodeURIComponent(theme.palette.text.secondary)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
        },
      },
    },
    "&.active": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      background: alpha(theme.palette.primary.main, 0.08),

      "& svg": {
        stroke: theme.palette.primary.main,
        fill: "none",
      },
    },
    "&:hover:not(.active)": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      background: alpha(theme.palette.primary.main, 0.08),
    },
    //     "&.MuiPaper-contained.active": {
    //       boxShadow: `-1px -1px 0 1px ${defaultColors["neutral-80"]} inset,
    //                    1px 1px 0 1px ${defaultColors["neutral-80"]} inset,
    //                    2px 2px 4px 0 ${defaultColors["neutral-10"]}`,
    //     },
    //     "&:not(.active)": {
    //       "& .MuiCardContent-root .MuiTypography-root": {
    //         color: `${defaultColors["neutral-90"]}`,
    //       },
    //       "& .CCFormSelectCard-Title": {
    //         color: "white",
    //       },
    //       "& .MuiSvgIcon-root path": {
    //         fill: defaultColors["neutral-90"],
    //       },
    //       "&:hover": {
    //         "& .MuiCardContent-root .MuiTypography-root": {
    //           color: "white",
    //         },
    //         "& .CCFormSelectCard-Title": {
    //           color: "white",
    //         },
    //         "& .MuiSvgIcon-root path": {
    //           fill: "white",
    //         },
    //       },
    //     },
    //     "& .MuiCardContent-root .MuiTypography-root": {
    //       color: defaultColors["neutral-98"],
    //     },
    //     "& .CCFormSelectCard-Title": {
    //       fontWeight: "bold",
    //     },
    //   };
    // }
  };
  return styles;
});

export const CCFormCard = styled(Card, {
  name: "MuiCreateCollectionForm",
  slot: "card",
})(({ theme }) => {
  let styles = {};

  // if (theme.palette.mode === "dark") {
  //   styles = {
  //     "& .MuiTypography-root": {
  //       color: defaultColors["neutral-98"],
  //     },
  //     "&.MuiPaper-root": {
  //       background: defaultColors["neutral-30"],
  //       border: 0,
  //       color: defaultColors["neutral-98"],
  //     },
  //   };
  // }
  // if (theme.palette.mode === "light") {
  //   styles = {
  //     "& .MuiTypography-root": {
  //       color: defaultColors["neutral-30"],
  //     },
  //     "&.MuiPaper-root": {
  //       background: theme.palette.background.paper,
  //       border: 0,
  //       boxShadow: `0px 0px 0px 1px ${defaultColors["neutral-80"]} inset`,
  //       color: defaultColors["neutral-30"],
  //     },
  //   };
  // }
  return styles;
});

export const CCFormButton = styled(Button, {
  name: "MuiCreateCollectionForm",
  slot: "button",
})(({ theme }) => ({
  // textTransform: "capitalize",
  // fontWeight: "semibold",
  // fontSize: "18px",
  // "&.MuiButton-contained": {
  //   display: "flex",
  //   height: "40px",
  //   padding: "8px 22px",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   alignSelf: "stretch",
  //   fontWeight: "semibold",
  //   fontSize: "15px",
  //   background:
  //     theme.palette.mode === "dark"
  //       ? defaultColors["secondary-blue-90"]
  //       : defaultColors["secondary-blue-50"],
  //   color:
  //     theme.palette.mode === "dark"
  //       ? defaultColors["neutral-10"]
  //       : defaultColors["neutral-100"],
  //   "&:hover": {
  //     background:
  //       theme.palette.mode === "dark"
  //         ? defaultColors["secondary-blue-70"]
  //         : defaultColors["secondary-blue-30"],
  //   },
  //   "&:active": {
  //     background:
  //       theme.palette.mode === "dark"
  //         ? defaultColors["secondary-blue-90"]
  //         : defaultColors["secondary-blue-50"],
  //   },
  //   "&:disabled": {
  //     background:
  //       theme.palette.mode === "dark"
  //         ? defaultColors["neutral-80"]
  //         : defaultColors["neutral-90"],
  //     color: defaultColors["neutral-60"],
  //   },
  // },
  // "& .MuiButton-icon": {
  //   marginTop: "-3px",
  // },
  // "&.MuiButton-text": {
  //   color:
  //     theme.palette.mode === "dark"
  //       ? defaultColors["secondary-blue-90"]
  //       : defaultColors["secondary-blue-50"],
  //   "&:hover": {
  //     background: "transparent",
  //     color:
  //       theme.palette.mode === "dark"
  //         ? defaultColors["secondary-blue-70"]
  //         : defaultColors["secondary-blue-30"],
  //   },
  // },
}));

export const CCFormControl = styled(FormControl, {
  name: "MuiCreateCollectionForm",
  slot: "formControl",
})(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export const CCFormInputBase = styled(InputBase, {
  name: "MuiCreateCollectionForm",
  slot: "input",
})(({ theme }) => ({
  display: "flex",

  "&[variant='outlined']": {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.23)"
        : "rgba(0, 0, 0, 0.23)",
    padding: "16px 12px",
    borderRadius: "8px",
    lineHeight: 1,
  },

  "& input": {
    padding: "0",
  },

  "&.Mui-focused": {
    // borderColor:
    //   theme.palette.mode === "dark"
    //     ? "white"
    //     : defaultColors["secondary-blue-30"],
  },

  "&.Mui-disabled": {
    // color:
    //   theme.palette.mode === "dark"
    //     ? defaultColors["neutral-80"]
    //     : defaultColors["neutral-50"],
  },
  // placeholder
  "& input::placeholder": {
    // color:
    //   theme.palette.mode === "dark"
    //     ? defaultColors["neutral-80"]
    //     : defaultColors["neutral-50"] + " !important",
  },

  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiSelect-select": {
    padding: 0,
    lineHeight: 1.5,
  },
}));

export const CCFormCheckbox = styled(Checkbox, {
  name: "MuiCreateCollectionForm",
  slot: "checkbox",
})(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? defaultColors["secondary-blue-90"]
      : defaultColors["secondary-blue-50"],
  "&.MuiCheckbox-colorPrimary": {
    color:
      theme.palette.mode === "dark"
        ? defaultColors["secondary-blue-90"]
        : defaultColors["secondary-blue-50"],
    "&.Mui-checked": {
      color:
        theme.palette.mode === "dark"
          ? defaultColors["secondary-blue-90"]
          : defaultColors["secondary-blue-50"],
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

export const CCFormDescription = styled(Paper, {
  name: "MuiCreateCollectionForm",
  slot: "description",
})(({ theme }) => {
  const styles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    a: {
      textDecoration: "none",
      whiteSpace: "nowrap",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& .MuiSvgIcon-root": {
      alignSelf: "flex-start",
    },
  };

  if (theme.palette.mode === "dark") {
    styles["&.MuiPaper-root"] = {
      border: 0,
      color: defaultColors["neutral-80"],

      "& .MuiTypography-root": {
        color: defaultColors["neutral-80"],
      },
    };
    styles.a.color = defaultColors["secondary-blue-90"];
    styles.a["&:hover"].color = defaultColors["secondary-blue-70"];
  }

  if (theme.palette.mode === "light") {
    styles["&.MuiPaper-root"] = {
      boxShadow: "none",
      color: defaultColors["neutral-40"],
      border: 0,
      "& .MuiTypography-root": {
        color: defaultColors["neutral-40"],
      },
    };
    styles.a.color = defaultColors["secondary-blue-50"];
    styles.a["&:hover"].color = defaultColors["secondary-blue-30"];
  }

  return styles;
});

export const CCFormAccordion = styled(Accordion, {
  name: "MuiCreateCollectionForm",
  slot: "accordion",
})(({ theme }) => {
  const styles = {
    boxShadow: "none",
    border: 0,
    "& .MuiAccordionSummary-root": {
      padding: 0,
      fontSize: "0.85rem",
      textDecoration: "underline",
    },
    "& .MuiAccordionDetails-root": {
      padding: "1rem 0",
    },
  };

  if (theme.palette.mode === "dark") {
    styles["&.MuiAccordion-root"] = {
      background: "transparent",
      color: defaultColors["neutral-94"],
    };

    styles["& .MuiAccordionSummary-root"] = {
      ...styles["& .MuiAccordionSummary-root"],
      color: defaultColors["secondary-blue-90"],
      "&:hover": {
        color: defaultColors["secondary-blue-70"],
      },
    };
  }

  if (theme.palette.mode === "light") {
    styles["&.MuiAccordion-root"] = {
      background: defaultColors["neutral-100"],
      color: defaultColors["neutral-30"],
    };

    styles["& .MuiAccordionSummary-root"] = {
      ...styles["& .MuiAccordionSummary-root"],
      color: defaultColors["secondary-blue-50"],
      "&:hover": {
        color: defaultColors["secondary-blue-30"],
      },
    };
  }

  return styles;
});

export const CCFormSlider = styled(Slider, {
  name: "MuiCreateCollectionForm",
  slot: "slider",
})(({ theme }) => {
  const styles = {
    "& .MuiSlider-markLabel": {
      "&:nth-of-type(4)": {
        transform: "none",
        left: 0,
      },
      "&:nth-last-of-type(2)": {
        left: "auto !important",
        transform: "none",
        right: "-3px",
      },
    },
  };

  if (theme.palette.mode === "dark") {
    styles["&.MuiSlider-root"] = {
      color: defaultColors["secondary-blue-90"],
      "& .MuiSlider-valueLabel": {
        color: defaultColors["neutral-98"],
        backgroundColor: defaultColors["secondary-blue-70"],
      },
      "& .MuiSlider-mark": {
        backgroundColor: defaultColors["neutral-100"],
      },
      "& .MuiSlider-markLabel": {
        ...styles["& .MuiSlider-markLabel"],
        color: defaultColors["neutral-98"],
      },
    };
  }

  if (theme.palette.mode === "light") {
    styles["&.MuiSlider-root"] = {
      color: defaultColors["secondary-blue-70"],
      "& .MuiSlider-valueLabel": {
        color: defaultColors["neutral-100"],
        backgroundColor: defaultColors["secondary-blue-90"],
      },
      "& .MuiSlider-mark": {
        backgroundColor: defaultColors["secondary-blue-50"],
      },
      "& .MuiSlider-markLabel": {
        ...styles["& .MuiSlider-markLabel"],
        color: defaultColors["neutral-30"],
      },
    };
  }

  return styles;
});

export const CCFormSidebarInner = styled(Box, {
  name: "MuiCreateCollectionForm",
  slot: "sidebarStickyInner",
})(({ theme }) => ({
  position: "sticky",
  top: "2rem",
  [theme.breakpoints.down("md")]: {
    position: "static",
  },
}));

export const CCFormSidebar = styled(
  (props) => (
    <Paper {...props}>
      <CCFormSidebarInner>{props.children}</CCFormSidebarInner>
    </Paper>
  ),
  {
    name: "MuiCreateCollectionForm",
    slot: "sidebar",
  },
)(({ theme }) => {
  return {
    borderRadius: 0,
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
    width: "clamp(200px, 25vw, 300px)",
    minWidth: "200px",
    padding: "2rem 1.5rem",
    flexShrink: 0,
    background:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-20"]
        : defaultColors["neutral-90"],
    color:
      theme.palette.mode === "dark"
        ? defaultColors["neutral-98"]
        : defaultColors["neutral-30"],
    zIndex: 2,
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      width: "100vw",
      top: "auto",
      padding: "1.5rem 1.5rem 2rem",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
    },
  };
});
