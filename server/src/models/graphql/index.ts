import { gql } from "apollo-server-express"
import * as dayjs from "dayjs"
import { GraphQLScalarType, Kind } from "graphql"
import { merge } from "lodash"
//
import { ResolverMap } from "../../types/gqlResolver"
import {
  fetchCountryListing,
  fetchDistinctCountries,
  fetchOneListing,
} from "./Listing"

export const typeDefs = gql`
  scalar Date

  type Location {
    type: String
    coordinates: [Float]
    is_location_exact: Boolean
  }
  type Country {
    country: String
    country_code: String
  }
  type ListingAddress {
    street: String
    suburb: String
    government_area: String
    market: String
    country: String
    country_code: String
    location: Location
  }
  type ListingImage {
    thumbnail_url: String
    medium_url: String
    picture_url: String
    xl_picture_url: String
  }
  type Availability {
    availability_30: Int
    availability_60: Int
    availability_90: Int
    availability_365: Int
  }
  type ReviewScore {
    review_scores_accuracy: Int
    review_scores_cleanliness: Int
    review_scores_checkin: Int
    review_scores_communication: Int
    review_scores_location: Int
    review_scores_value: Int
    review_scores_rating: Int
  }
  type Host {
    host_id: String
    host_url: String
    host_name: String
    host_location: String
    host_about: String
    host_thumbnail_url: String
    host_picture_url: String
    host_neighbourhood: String
    host_is_superhost: Boolean
    host_has_profile_pic: Boolean
    host_identity_verified: Boolean
    host_listings_count: Int
    host_total_listings_count: Int
    host_verifications: [String]
  }
  type Listing {
    _id: String
    listing_url: String
    name: String
    summary: String
    space: String
    description: String
    neighborhood_overview: String
    notes: String
    transit: String
    access: String
    interaction: String
    house_rules: String
    property_type: String
    room_type: String
    bed_type: String
    minimum_nights: String
    maximum_nights: String
    cancellation_policy: String
    last_scraped: Date
    calendar_last_scraped: Date
    first_review: Date
    last_review: Date
    accomodates: Int
    beds: Int
    bedrooms: Int
    number_of_reviews: Int
    bathrooms: Float
    amenities: [String]
    price: Float
    weekly_price: Float
    monthly_price: Float
    cleaning_fee: Float
    extra_people: Float
    guests_included: Int
    images: ListingImage
    host: Host
    address: ListingAddress
    availability: Availability
    review_scores: ReviewScore
  }
  type ListingsWithCount {
    listing: [Listing]
    stays: Int
  }
  input qGreaterThan {
    gte: Int
  }
  input qArrayMatch {
    all: [String]
  }
  input qCountryObject {
    country: String!
    name: String
    beds: qGreaterThan
    bathrooms: qGreaterThan
    bedrooms: qGreaterThan
    guests_included: qGreaterThan
    property_type: String
    is_superhost: Boolean
    amenities: qArrayMatch
  }
  input qCountry {
    query: qCountryObject
    limit: Int
    skip: Int
  }
  type Query {
    hello: String
    oneListing(id: String): Listing
    availableCountries: [Country]
    countryListings(q: qCountry): ListingsWithCount
  }
`

const scalars = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
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
  Query: {
    hello: () => "hello World",
    oneListing: (_, args) => fetchOneListing(args.id),
    availableCountries: () => fetchDistinctCountries(),
    countryListings: (_, args) => fetchCountryListing(args.q),
  },
}

export const resolvers = merge(scalars, someResolvers)
