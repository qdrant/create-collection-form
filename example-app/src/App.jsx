import { useMemo, useState } from "react";
import "./App.css";
import { CreateCollectionForm } from "../../";
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
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
        // see ../src/ThemedComponents.jsx for the reference
        components: {
          MuiCreateCollectionForm: {
            // the name of the component
            styleOverrides: {
              // root: {
              // "root" is a slot name
              //   backgroundColor: 'green',
              // },
              // selectCard: { // "selectCard" is a slot name
              // },
              // sidebar: {
              //   top: "-68px",
              // },
              // sidebarStickyInner: {
              //   top: "88px",
              // },
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
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/*App Header Menu, just an example */}
            {/* See above how to adjust sidebar position */}
            <AppBar position="static" sx={{ flexGrow: 0 }}>
              <Toolbar>
                <IconButton size="large" onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </IconButton>
              </Toolbar>
            </AppBar>
            {/*End of App Header Menu*/}

            {/*Form Component*/}
            {/* See above how to adjust styles */}
            <CreateCollectionForm
              hideSidebar={true}
              onFinish={(data) => {
                alert(JSON.stringify(data, null, 2));
                // This is just an example of how to handle the form finish,
                // but you always have to return a promise that resolves to a value,
                // otherwise the form will not be cleared (for example, if an error occurs).
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(data);
                  }, 100);
                });
              }}
            />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
