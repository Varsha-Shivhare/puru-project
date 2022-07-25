// import PropTypes from 'prop-types';
import { useMemo, useContext } from "react";
import { ColorModeContext } from "../App";
// material
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import { darkPallete, lightPallete } from "./palette";
import typography from "./typography";
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const { mode } = useContext(ColorModeContext);

  const themeOptions = useMemo(
    () => ({
      palette: {
        mode,
        ...(mode === "light" ? lightPallete : darkPallete),
      },
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    [mode],
  );

  const theme = createTheme(themeOptions);
  //   theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
