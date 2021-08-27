import React, { createContext } from "react"
import { useParams, useLocation } from "react-router"
import { useQuery, gql, ApolloError } from "@apollo/client"
import { IListing } from "./../../types/Listing"

const ROOM_Q = gql`
   query room($param: String){
      oneListing(id: $param){
         listing_url
         name
         description
         space
         summary
         first_review
         last_review
         number_of_reviews
         minimum_nights
         maximum_nights
         beds
         guests_included
         bedrooms
         amenities
         review_scores{
           review_scores_rating
           review_scores_value
         }
         images{
            thumbnail_url
            medium_url
            picture_url
            xl_picture_url
         }
         address{
            market
            country
         }
         host{
            host_is_superhost
            host_name
            host_url
            host_thumbnail_url
            host_picture_url
            host_has_profile_pic
         }
         notes
         address{
            street
            suburb
            government_area
            location{
               type
               coordinates
               is_location_exact
            }
            country
            country_code
         }
      }    
   }
`

interface IURLParam {
   id: string
}

interface IRoom {
   oneListing: IListing
}

interface IDefaultValue {
   loading: boolean,
   error: ApolloError | undefined
   data: IRoom | null | undefined
}

const defaultValue: IDefaultValue = {
   loading: true,
   error: undefined,
   data: null,
}

export function useRouterQuery() {
   return new URLSearchParams(useLocation().search);
}

export const RoomContext = createContext(defaultValue)

export const RoomProvider: React.FC<React.ReactNode> = ({ children }) => {
   const match = useParams<IURLParam>()
   // let query = useRouterQuery()
   const { loading, error, data } = useQuery<IRoom>(ROOM_Q, {
      variables: { param: match.id }
   })

   return (
      <RoomContext.Provider value={{ loading, error, data }}>
         {children}
      </RoomContext.Provider>
   )
}