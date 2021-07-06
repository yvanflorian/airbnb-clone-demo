import { createMuiTheme,responsiveFontSizes } from "@material-ui/core/styles"


declare module '@material-ui/core/styles/createMuiTheme' {
   interface Theme {
     buttons: {
       main: React.CSSProperties['color'],
     }
   }
   interface ThemeOptions {
      buttons: {
         main: React.CSSProperties['color']
     }
   }
 }
 
declare module "@material-ui/core/styles/createPalette" {
   interface Palette {
      neutral: Palette['primary'];
   }
   interface PaletteOptions {
      neutral: PaletteOptions['primary'];
   }
 }

const baretheme = createMuiTheme({
   buttons:{
      main: "#5babfa"
   },
   palette:{
      primary:{
         // main: colors.blue[700]
         main: '#3ea7d4'
      },
      neutral: {
        main: '#4191ff',
      },
      text:{
         primary: "#384452",
         secondary: "#546b82"
      },
      action:{
         active: "#546b82",
         hover: "#d3e9ff",
         selected: "#e0f0ff"
      }
   },
   typography: {
     fontFamily: [
        'Montserrat',
      //   ' -apple-system',
      //   ' BlinkMacSystemFont',
      //   ' Roboto',
      //   ' Arial',
        ' sans-serif',
      //   ' HP Simplified Light',
      //   ' Helvetica',
      //   ' Arial'
     ].join(','),
     fontSize:16,
   },
})

const theme = responsiveFontSizes(baretheme)
export default theme