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
interface ICountryLocation {
   long_name: string
   short_name: string
   center_lat: string
   center_lng: string
   sw_lat: string
   sw_lng: string
   ne_lat: string
   ne_lng: string
}


interface ICountryListing {
   countryListings: {
      listing: IListing[],
      stays: string,
      countryLocation: ICountryLocation
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

type gqlLocation = {
   coordinates: {
      ne_lng: number
      ne_lat: number
      nw_lng: number
      nw_lat: number
      sw_lng: number
      sw_lat: number
      se_lng: number
      se_lat: number
   }
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
      is_superhost?: boolean,
      amenities?: IArrayFilter,
      location?: gqlLocation
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
         countryLocation{
            long_name
            short_name
            center_lat
            center_lng
         }
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
   if (rooms !== null) initFilters.query.room_type = { in: rooms.split("+") }

   if (query.has("superhost")) initFilters.query.is_superhost = Boolean(query.get("superhost"))
   if (query.has("ne_lng")) {
      initFilters.query.location = {
         coordinates: {
            ne_lng: Number(query.get("ne_lng")),
            ne_lat: Number(query.get("ne_lat")),
            nw_lng: Number(query.get("nw_lng")),
            nw_lat: Number(query.get("nw_lat")),
            sw_lng: Number(query.get("sw_lng")),
            sw_lat: Number(query.get("sw_lat")),
            se_lng: Number(query.get("se_lng")),
            se_lat: Number(query.get("se_lat"))
         }
      }

   }


   const [filters, setFilters] = useState<ICountryListingFilters>(initFilters)

   console.log("Query Filters now: ", JSON.stringify(filters.query))

   const { loading, error, data } = useQuery<ICountryListing, IOneCountryParam>(
      COUNTRY_LISTINGS_Q, { variables: { param: filters } }
   )

   return (
      <CountryListingContext.Provider value={{ loading, error, data, fullMap, setFullMap, filters, setFilters }}>
         {children}
      </CountryListingContext.Provider>
   )

}