import { gql, useQuery } from "@apollo/client"
//mui-core
import { makeStyles, Theme, createStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import React from "react"

const useStyles = makeStyles((theme:Theme)=>createStyles({
   firstImage:{
      // display: "flex",
      // alignItems: "stretch",
      // // width: "100vw",
      // position: "relative",
   },
   imageContainer:{
      width: "100%",
      height: "85vh",
   },
   imageContent:{
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "center",
      backgroundPositionY: "bottom",
      [theme.breakpoints.up('md')]: {
         backgroundImage: "url('https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560')"
      },
      [theme.breakpoints.down("md")]:{
         backgroundImage: "url('https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=960')"
      },
      [theme.breakpoints.down("sm")]:{
         backgroundImage : "url('https://a0.muscache.com/im/pictures/e09893fc-1d02-49b2-befa-c4be7a57ed18.jpg?im_w=720')"
      },
      [theme.breakpoints.down("xs")]:{
         backgroundImage : "url('https://a0.muscache.com/im/pictures/0c38042b-8685-4180-8d9b-12a6892ac6d8.jpg?im_w=320')"
      }
   },
   textOverImage: {
      position: "absolute",
      [theme.breakpoints.up('lg')]: {
         fontSize: theme.typography.h6.fontSize,
         fontWeight: 600, 
         bottom: "53%",
         left: "45%",
       },
      [theme.breakpoints.down('lg')]: {
         fontSize: theme.typography.h6.fontSize,
         fontWeight: 600, 
         bottom: "47%",
         left: "43%",
       },
      [theme.breakpoints.down('md')]: {
         fontSize: theme.typography.h6.fontSize,
         fontWeight: 600, 
         bottom: "43%",
         left: "37%",
       },
       [theme.breakpoints.down('sm')]: {
          fontSize: theme.typography.h6.fontSize,
          fontWeight: 600, 
          bottom: "43%",
          left: "33%",
        },
        [theme.breakpoints.down('xs')]: {
           fontSize: theme.typography.body1.fontSize,
           fontWeight: 600, 
           bottom: "53%",
           left: "23%",
         },
   },
   title:{
      margin: theme.spacing(4),
      paddingLeft: theme.spacing(6),
      fontWeight: 800,
      [theme.breakpoints.down('md')]: {
         fontSize: '2.4rem',
         fontWeight: 500
       },
   },
   cardsContainer: {
      padding: theme.spacing(3)
   },
   cards:{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      padding: theme.spacing(2)
   },
   countryTypo:{
      padding: theme.spacing(2),
      fontWeight: 500,
   }
}))

interface ICountry {
   country: String,
   country_code: String
}

const DISTINCT_COUNTRIES_Q = gql `
   query{
      availableCountries{
      country
      country_code
      }
   }
`
export default function Contents(){
   const classes = useStyles()
   const {loading,error,data} = useQuery(DISTINCT_COUNTRIES_Q)
   
   const isLoading = 
      <div>
         <Typography
            variant="h4"
         >
            Loading 
         </Typography>
      </div>

   const hasLoaded =
      <div>
         <div className={classes.firstImage}>
            <div className={classes.imageContainer}>
               <div className={classes.imageContent}/>
            </div>
            <Typography
               className={classes.textOverImage}
               variant="h4"
            >
               Not sure where to go? Perfect.
            </Typography>
         </div>
         <div>
            <Typography
               className={classes.title}
               variant="h5"
            >
               Explore nearby
            </Typography>
            <div className={classes.cardsContainer}>
               <Grid container spacing={3}>
                  {loading ? isLoading :data.availableCountries.map((oneCountry:ICountry, index: React.Key)=>(
                     <Grid 
                       item
                       sm={4}
                       key={index}
                     > 
                        <Paper className={classes.cards} elevation={0}>
                           <img 
                              src={`https://www.countryflags.io/${oneCountry.country_code}/flat/64.png`}
                              alt="country Flag"
                           />
                           <Typography 
                              className={classes.countryTypo}
                              variant="body2"
                           >
                              {oneCountry.country}
                           </Typography>
                        </Paper>
                     </Grid>
                  ))}
               </Grid>
            </div>
         </div>
      </div>
   

   const isError = 
      <div>
         <Typography
            variant="h6"
         >
            Error! 
         </Typography>
      </div>
   
   if (loading) return isLoading;
   if (error) return isError;
   else return hasLoaded
}
