import * as React from "react";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./routes";
import ThemeProvider from "./theme";

interface ColorModeContextProps {
  toggleColorMode: () => void;
  mode: "dark" | "light";
}

export const ColorModeContext = React.createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
  mode: "light",
});

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const themeValue: any = localStorage.getItem("theme");
    if (themeValue != null && themeValue) {
      setMode(themeValue);
    } else {
      localStorage.setItem("theme", mode);
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          if (prevMode === "light") {
            localStorage.setItem("theme", "dark");
            return "dark";
          } else {
            localStorage.setItem("theme", "light");
            return "light";
          }
        });
      },
      mode,
    }),
    [mode],
  );

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider>
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export const useColorMode = () => React.useContext(ColorModeContext);

export default App;
