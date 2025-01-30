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
import { CreateCollectionFormTheme } from "../../src/theme/theme.js";
import merge from "lodash.merge";

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
      createTheme(
        merge(
          {
            palette: {
              mode,
            },
          },
          CreateCollectionFormTheme.colorSchemes[mode],
        ),
      ),
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
            <CreateCollectionForm />
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
