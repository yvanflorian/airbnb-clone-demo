import React, { createContext, useState } from "react"
import { gql, useQuery, ApolloError } from "@apollo/client"
import { useParams } from "react-router-dom"
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
interface IOneCountryParam {
   param: string
}

interface ICountryListing {
   countryListings: IListing[]
}

const COUNTRY_LISTINGS_Q = gql`
   query countryListings($param: String!){
      countryListings(code: $param){
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
   }
`
interface IDefaultValue {
   loading: boolean,
   error: ApolloError | undefined
   data: ICountryListing | null | undefined
   fullMap: boolean
   setFullMap: React.Dispatch<React.SetStateAction<boolean>>
}
const defaultValue: IDefaultValue = {
   loading: true,
   error: undefined,
   data: null,
   fullMap: false,
   setFullMap: () => false
}

export const CountryListingContext = createContext(defaultValue)

export const CountryListingProvider: React.FC<React.ReactNode> = ({ children }) => {
   const match = useParams<IURLParam>()
   const { loading, error, data } = useQuery<ICountryListing, IOneCountryParam>(
      COUNTRY_LISTINGS_Q, {
      variables: {
         param: match.countryCode
      }
   }
   )
   const [fullMap, setFullMap] = useState(false)

   return (
      <CountryListingContext.Provider value={{ loading, error, data, fullMap, setFullMap }}>
         {children}
      </CountryListingContext.Provider>
   )

}