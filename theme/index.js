import { extendTheme } from "@chakra-ui/react";

const themeConfig = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: "#0070f3",
  },
};
const theme = extendTheme({ ...themeConfig });

export default theme;
