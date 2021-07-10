import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import clsx from "clsx"
//mui-core
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import React from "react"


//https://a0.muscache.com/im/pictures/676c0a60-2a5a-4598-aeeb-10a81aa5232f.jpg?aki_policy=large

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      firstImage: {
      },
      linkAttribute: {
         textDecoration: "none"
      },
      imageContainer: {
         width: "100%",
         height: "85vh",
      },
      imageContent: {
         width: "100%",
         height: "100%",
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundPositionX: "center",
         backgroundPositionY: "bottom",
         [theme.breakpoints.up("md")]: {
            backgroundImage:
               "url('https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560')",
         },
         [theme.breakpoints.down("md")]: {
            backgroundImage:
               "url('https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=960')",
         },
         [theme.breakpoints.down("sm")]: {
            backgroundImage:
               "url('https://a0.muscache.com/im/pictures/e09893fc-1d02-49b2-befa-c4be7a57ed18.jpg?im_w=720')",
         },
         [theme.breakpoints.down("xs")]: {
            backgroundImage:
               "url('https://a0.muscache.com/im/pictures/0c38042b-8685-4180-8d9b-12a6892ac6d8.jpg?im_w=320')",
         },
      },
      textOverImage: {
         position: "absolute",
         [theme.breakpoints.up("lg")]: {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: 600,
            bottom: "53%",
            left: "45%",
         },
         [theme.breakpoints.down("lg")]: {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: 600,
            bottom: "47%",
            left: "43%",
         },
         [theme.breakpoints.down("md")]: {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: 600,
            bottom: "43%",
            left: "37%",
         },
         [theme.breakpoints.down("sm")]: {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: 600,
            bottom: "43%",
            left: "33%",
         },
         [theme.breakpoints.down("xs")]: {
            fontSize: theme.typography.body1.fontSize,
            fontWeight: 600,
            bottom: "53%",
            left: "23%",
         },
      },
      exploreNearbylayout: {
         [theme.breakpoints.down("md")]: {
            paddingLeft: "40px"
         },
         [theme.breakpoints.up("md")]: {
            paddingLeft: "80px",
            paddingRight: "80px"
         }
      },
      title: {
         marginTop: theme.spacing(4),
         fontWeight: 800,
         [theme.breakpoints.down("md")]: {
            fontWeight: 500,
         },
      },
      cardsContainer: {
         paddingTop: theme.spacing(2),
      },
      cards: {
         display: "flex",
         flexDirection: "row",
         flexWrap: "wrap",
         justifyContent: "flex-start",
         padding: theme.spacing(2),
      },
      countryTypo: {
         padding: theme.spacing(2),
         fontWeight: 500,
      },
   })
)

interface ICountry {
   country: String
   country_code: String
}

const DISTINCT_COUNTRIES_Q = gql`
  query distinctCountries {
    availableCountries {
      country
      country_code
    }
  }
`
export default function Contents() {
   const classes = useStyles()
   const { loading, error, data } = useQuery(DISTINCT_COUNTRIES_Q)

   const isLoading = (
      <div>
         <Typography variant="h4">Loading</Typography>
      </div>
   )

   const hasLoaded = (
      <div>
         <div className={classes.firstImage}>
            <div className={classes.imageContainer}>
               <div className={classes.imageContent} />
            </div>
            <Typography className={classes.textOverImage} variant="h4">
               Not sure where to go? Perfect.
            </Typography>
         </div>
         <div>
            <Typography className={clsx(classes.title, classes.exploreNearbylayout)} variant="h5">
               Explore nearby
            </Typography>
            <div className={(clsx(classes.cardsContainer, classes.exploreNearbylayout))}>
               <Grid container spacing={3}>
                  {loading
                     ? isLoading
                     : data.availableCountries.map(
                        (oneCountry: ICountry, index: React.Key) => (
                           <Grid item lg={3} md={4} xs={12} key={index}>
                              <Link to={`/${oneCountry.country_code}`} className={classes.linkAttribute}>
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
                              </Link>
                           </Grid>
                        )
                     )}
               </Grid>
            </div>
         </div>
      </div>
   )

   const isError = (
      <div>
         <Typography variant="h6">Error!</Typography>
      </div>
   )

   if (loading) return isLoading
   if (error) return isError
   else return hasLoaded
}
