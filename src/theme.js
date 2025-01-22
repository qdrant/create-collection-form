const defaultColors = {
  "neutral-10": "#090e1a",
  "neutral-20": "#161e33",
  "neutral-30": "#28324d",
  "neutral-40": "#3d4866",
  "neutral-50": "#576280",
  "neutral-60": "#717c99",
  "neutral-70": "#8f98b2",
  "neutral-80": "#b4bacc",
  "neutral-90": "#d4d9e6",
  "neutral-94": "#e1e5f0",
  "neutral-98": "#f0f3fa",
  "neutral-100": "#ffffff",

  "primary-10": "#40000e",
  "primary-20": "#67001b",
  "primary-30": "#91012a",
  "primary-40": "#be003a",
  "primary-50": "#dc244c",
  "primary-60": "#ff516b",
  "primary-70": "#ff8792",
  "primary-80": "#ffb2b7",
  "primary-90": "#ffdadb",

  "secondary-blue-10": "#001848",
  "secondary-blue-30": "#0040a1",
  "secondary-blue-50": "#2f6ff0",
  "secondary-blue-70": "#89a9ff",
  "secondary-blue-90": "#d9e2fe",

  "secondary-violet-10": "#24005b",
  "secondary-violet-30": "#5700c9",
  "secondary-violet-50": "#8547ff",
  "secondary-violet-70": "#b99aff",
  "secondary-violet-90": "#eaddff",

  "secondary-teal-10": "#002020",
  "secondary-teal-30": "#004f4f",
  "secondary-teal-50": "#038585",
  "secondary-teal-70": "#77e5e5",
  "secondary-teal-90": "#c0f0f0",

  "success-10": "#00210f",
  "success-30": "#00522f",
  "success-50": "#008a53",
  "success-70": "#50bf83",
  "success-90": "#befad6",

  "warning-10": "#311300",
  "warning-30": "#733501",
  "warning-50": "#e0700d",
  "warning-70": "#ff8d39",
  "warning-90": "#ffdbc7",

  "error-10": "#410002",
  "error-30": "#93000d",
  "error-50": "#e02828",
  "error-70": "#fe897f",
  "error-90": "#ffdad6",
};

export const defaultTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: defaultColors["primary-50"],
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
          default: defaultColors["neutral-98"],
          paper: defaultColors["neutral-100"],
        },
        text: {
          primary: defaultColors["neutral-10"],
          secondary: defaultColors["neutral-50"],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: defaultColors["primary-50"],
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
          paper: `linear-gradient(180deg, ${defaultColors["neutral-20"]} 0%, rgba(14, 20, 36, 0.10) 100%)`,
        },
        text: {
          primary: defaultColors["neutral-10"],
          secondary: defaultColors["neutral-50"],
        },
      },
    },
  },
};
