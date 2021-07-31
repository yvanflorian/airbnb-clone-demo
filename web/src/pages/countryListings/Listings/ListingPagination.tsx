import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { CountryListingContext, useRouterQuery } from "../dataContext"
//mui-core
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
//mui-lab
import Pagination from "@material-ui/lab/Pagination"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(3)
   },
   places: {
      padding: theme.spacing(2)
   }
}))

interface IListingPaginationProps {
   stays: string
   loading: boolean
}

/**
 * Listing Pagination
 * @param props 
 * @returns 
 */
export const ListingPagination = (props: IListingPaginationProps): JSX.Element => {
   //styles
   const classes = useStyles()
   //Context
   let history = useHistory()
   let query = useRouterQuery()
   const { filters, setFilters } = useContext(CountryListingContext)
   const [page, setPage] = useState<number>(Number(query.get("page")) || 1)
   const [staysCount, setStaysCount] = useState<number>(Number(props.stays.replace("+", "")))

   useEffect(() => {
      if (!props.loading) setStaysCount(Number(props.stays.replace("+", "")))
   }, [props.stays, props.loading, setStaysCount])

   const handlechange = (event: object, page: number) => {
      if (filters !== null && filters !== undefined) {
         setFilters({
            ...filters,
            query: {
               country: filters.query.country,
            },
            skip: (page - 1) * 20
         })
         if (query.has("page")) query.delete("page")
         query.append("page", page.toString())
         setPage(page)
         history.replace({
            search: query.toString()
         })
      }
   }

   // const staysCount: number = (Number(props.stays.replace("+", "")))
   // const staysCount: number = stays

   const noReturn =
      <div className={classes.root}>
         <Typography>No Results</Typography>
      </div>

   const less20 =
      <div className={classes.root}>
         <Typography variant="body2">{`1 – ${staysCount} of ${staysCount} places to stay`}</Typography>
         <Typography variant="caption">Enter dates to see full pricing. Additional fees apply. Taxes may be added.</Typography>
      </div>

   const more20 =
      <div className={classes.root}>
         <Pagination
            count={Math.round(staysCount / 20)}
            onChange={handlechange}
            page={page}
         />
         <div className={classes.places}>
            <Typography variant="body2">{`1 – 20 of ${props.stays} places to stay`}</Typography>
         </div>
         <div>
            <Typography variant="caption">Enter dates to see full pricing. Additional fees apply. Taxes may be added.</Typography>

         </div>
      </div>

   if (staysCount === 0) return noReturn
   if (staysCount > 0 && staysCount <= 20) return less20
   else return more20
}