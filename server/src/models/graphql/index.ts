import { gql, } from 'apollo-server-express'
import * as dayjs from "dayjs"
import { GraphQLScalarType, Kind } from "graphql"
import { merge } from "lodash"
//
import { ResolverMap } from '../../types/gqlResolver'
import { IListing, Listing } from "./../mongoose/Listing"
import { fetchDistinctCountries, fetchOneListing } from './Listing'

export const typeDefs = gql`
   scalar Date
   type Location{
      type: String,
      coordinates: [Int],
      is_location_exact: Boolean
   }
   type ListingAddress{
      street: String,
      suburb: String,
      government_area: String,
      market: String,
      country: String,
      country_code: String,
      location: Location
   }
   type Listing{
      _id: String,
      listing_url: String,
      name: String,
      summary: String,
      space: String,
      description: String,
      neighborhood_overview: String,
      notes: String,
      transit: String,
      access: String,
      interaction: String,
      house_rules: String,
      property_type: String,
      room_type: String,
      bed_type: String,
      minimum_nights: String,
      maximum_nights: String,
      cancellation_policy: String,
      last_scraped: Date,
      calendar_last_scraped: Date,
      first_review: Date,
      last_review: Date,
      accomodates:Int,
      beds: Int,
      number_of_reviews: Int,
      address: ListingAddress
   }
   type Query{
      hello: String,
      oneListing(id: String): Listing,
      availableCountries: [String]
   }
`


const scalars = {
   Date:new GraphQLScalarType({
      name: 'Date',
      description: 'Date custom scalar type',
      serialize(value) {
        return dayjs(value).format("DD-MM-YYYY HH:mm:ss")
      },
      parseValue(value) {
        return dayjs(value)
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
          return dayjs(ast.value)
       }
        return null
      },
    }),
}


const someResolvers: ResolverMap = {
   Query:{
      hello : () => "hello World",
      oneListing: (_,args) => fetchOneListing(args.id),
      availableCountries : () => fetchDistinctCountries()
   }
}

export const resolvers = merge(scalars, someResolvers)