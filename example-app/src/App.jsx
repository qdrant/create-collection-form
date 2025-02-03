import { useMemo, useState } from "react";
import "./App.css";
import { CreateCollectionForm } from "../../";
import {
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { ColorModeContext } from "./context/color-context.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { dropdownTheme } from "../../src/theme/dropdown-theme.js";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(
    localStorage.getItem("qdrant-web-ui-theme") ||
      (prefersDarkMode ? "dark" : "light"),
  );
  localStorage.setItem("qdrant-web-ui-theme", mode);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: mode === "dark" ? "#0b0f19" : "#f0f3fa",
          },
          mode,
        },
        // here is how to override CreateCollectionForm's styles,
        // see src/ThemedComponents.jsx for the reference
        components: {
          MuiCreateCollectionForm: {
            // the name of the component
            styleOverrides: {
              // root: { // "root" is a slot name
              //   backgroundColor: 'green',
              // },
              // selectCard: { // "selectCard" is a slot name
              // }
              // etc.
            },
          },
          // dropdown theme overrides are the separate file
          // due to component's popover nature
          // this will affect ALL dropdowns in the app
          // use only if you want to change the default dropdown theme
          ...dropdownTheme,
        },
      }),
    [mode],
  );
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <IconButton size="large" onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            <CreateCollectionForm onFinish={(data) => alert(data)} />
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
