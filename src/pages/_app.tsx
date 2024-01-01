import { ReactNode } from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  CssBaseline,
  Box,
  IconButton,
  ThemeProvider,
  useTheme,
  createTheme,
} from "@mui/material";
import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ToggleColorMode = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
};

interface MyAppProps extends AppProps {
  Component: {
    (props: AppProps): JSX.Element;
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              color: "text.primary",
              borderRadius: 1,
              p: 3,
            }}
          >
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
          {Component.getLayout ? (
            Component.getLayout(<Component {...pageProps} />)
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
