import React, { createContext, useState } from "react"
import { gql, useQuery, ApolloError } from "@apollo/client"
import { useParams, useLocation } from "react-router-dom"
import { IListing } from "./../../types/Listing"

//todo TS find a way to represent a subset of an interface
// interface ICountryListing {
//    image: {
//       picture_url: string
//    },
//    name: string,
//    guests_included: number
// }

interface IURLParam {
   countryCode: string
}

interface IQuery {
   country: string
}
interface IOneCountryParam {
   param: {
      query: IQuery,
      limit: number,
      skip: number
   }
}

interface ICountryListing {
   countryListings: {
      listing: IListing[],
      stays: string
   },
   roomTypes: string[]
}

interface IGreaterThan {
   gte: number
}
interface IArrayFilter {
   all: string[]
}
interface IObjectIn {
   in: string[]
}
export interface ICountryListingFilters {
   query: {
      country: string,
      beds?: IGreaterThan,
      bathrooms?: IGreaterThan,
      bedrooms?: IGreaterThan,
      guests_included?: IGreaterThan,
      property_type?: IObjectIn,
      room_type?: IObjectIn,
      is_superhost?: string,
      amenities?: IArrayFilter,
   },
   limit: number,
   skip: number
}

const COUNTRY_LISTINGS_Q = gql`
   query countryListings($param: qCountry){
      countryListings(q: $param){
         listing{
            _id
            images{
               picture_url
            }
            name
            guests_included
            bedrooms
            beds
            property_type
            address{
               country
               suburb
               location{
                  coordinates
               }
            }
            number_of_reviews
            amenities
            price
            review_scores{
               review_scores_rating
            }
         }
         stays
      }
      roomTypes
   }
`
interface IDefaultValue {
   loading: boolean,
   error: ApolloError | undefined
   data: ICountryListing | null | undefined
   fullMap: boolean
   setFullMap: React.Dispatch<React.SetStateAction<boolean>>
   filters: ICountryListingFilters | null | undefined,
   setFilters: React.Dispatch<React.SetStateAction<ICountryListingFilters>>
}
const defaultValue: IDefaultValue = {
   loading: true,
   error: undefined,
   data: null,
   fullMap: false,
   setFullMap: () => false,
   filters: null,
   setFilters: () => ({
      query: {
         country: "ES"
      },
      limit: 20,
      skip: 0
   })
}
/**
 * A custom hook that builds on useLocation to parse
 * the query string for you.
 *  
 */
export function useRouterQuery() {
   return new URLSearchParams(useLocation().search);
}

export const CountryListingContext = createContext(defaultValue)

export const CountryListingProvider: React.FC<React.ReactNode> = ({ children }) => {
   const match = useParams<IURLParam>()
   const [fullMap, setFullMap] = useState(false)
   let query = useRouterQuery()
   const initFilters: ICountryListingFilters = {
      query: {
         country: match.countryCode,
      },
      limit: 20,
      skip: 0
   }
   let rooms = query.get("rooms")
   if (rooms !== null) initFilters.query.room_type = { in: rooms.split(",") }


   const [filters, setFilters] = useState<ICountryListingFilters>(initFilters)


   const { loading, error, data } = useQuery<ICountryListing, IOneCountryParam>(
      COUNTRY_LISTINGS_Q, { variables: { param: filters } }
   )

   console.log("Rooms Query:", query.get("rooms"))
   console.log("Rooms Query Formatted:", query.get("rooms")?.split(","))



   return (
      <CountryListingContext.Provider value={{ loading, error, data, fullMap, setFullMap, filters, setFilters }}>
         {children}
      </CountryListingContext.Provider>
   )

}