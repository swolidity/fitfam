import { ThemeProvider, CSSReset } from "@chakra-ui/core";

export default ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    {children}
  </ThemeProvider>
);
