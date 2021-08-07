import React, { createContext } from "react"
import { useParams, useLocation } from "react-router"
import { useQuery, gql, ApolloError } from "@apollo/client"
import { IListing } from "./../../types/Listing"

const ROOM_Q = gql`
   query room($param: String){
      oneListing(id: $param){
         listing_url
         name
         space
         summary
         first_review
         last_review
         minimum_nights
         maximum_nights
         beds
         images{
            thumbnail_url
            medium_url
            picture_url
            xl_picture_url
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
   let query = useRouterQuery()
   const { loading, error, data } = useQuery<IRoom>(ROOM_Q, {
      variables: { param: match.id }
   })

   return (
      <RoomContext.Provider value={{ loading, error, data }}>
         {children}
      </RoomContext.Provider>
   )
}