import {
  responsiveFontSizes,
  createMuiTheme,
  Theme,
} from "@material-ui/core/styles"
// import createTheme, { Theme } from "@material-ui/core/styles/createTheme"

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    buttons: {
      main: React.CSSProperties["color"]
    }
  }
  interface ThemeOptions {
    buttons: {
      main: React.CSSProperties["color"]
    }
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette["primary"]
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"]
  }
}

const baretheme: Theme = createMuiTheme({
  buttons: {
    main: "#5babfa",
  },
  palette: {
    primary: {
      main: "#3ea7d4",
    },
    neutral: {
      main: "#4191ff",
    },
    text: {
      primary: "#000000",
      secondary: "##222222",
    },
    action: {
      active: "#000000",
      hover: "#d3e9ff",
      selected: "#e0f0ff",
    },
  },
  typography: {
    fontFamily: [
      "Circular",
      " -apple-system",
      " BlinkMacSystemFont",
      " Roboto",
      " sans-serif",
    ].join(","),
    fontSize: 15,
    h4: {
      fontWeight: 700,
    },
    body2: {
      fontWeight: 300,
      color: "#717171",
    },
    subtitle1: {
      fontWeight: 300,
      color: "#717171",
    },
    subtitle2: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      // md: 960,
      md: 750,
      lg: 1130,
      xl: 1920,
    },
  },
})

const theme: Theme = responsiveFontSizes(baretheme)
export default theme
