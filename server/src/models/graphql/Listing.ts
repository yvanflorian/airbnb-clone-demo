import { ICountryLocation } from "../mongoose/Country"
import { IListing, Listing } from "../mongoose/Listing"
import { fetchOneCountry } from "./Country"
import { gqlListing, IQGeneral, keyChange } from "./ListingUtils"

interface IAggregation {
  _id: {
    country: String
    country_code: String
  }
}
interface ICountries {
  country: String
  country_code: String
}

interface IListingWithCount {
  listing: IListing[]
  stays: string
  countryLocation: ICountryLocation
}
/**
 * GQL Resolver to fetch only one Listing based on the ID
 *
 * @param id Listing ID
 * @returns A listing and Review Document
 */
export const fetchOneListing = async (id: String) => {
  console.log("GQL: One Listing Query with ID:", id)
  try {
    const one: IListing = await Listing.findById(id)
    // console.log("We're done!",one)
    return one
  } catch (error) {
    console.error(error)
  }
}
/**
 * Check this
 * https://docs.mongodb.com/manual/reference/operator/aggregation/group/#std-label-null-example
 * @returns List of Available Countries
 */
export const fetchDistinctCountries = async () => {
  console.log("[Log] GQL Fetch Distinct Countries")
  let countries: ICountries[] = []
  try {
    const distinctCountry: IAggregation[] = await Listing.aggregate([
      {
        $group: {
          _id: {
            country: "$address.country",
            country_code: "$address.country_code",
          },
        },
      },
    ])
    distinctCountry.map((country) =>
      countries.push({
        country: country._id.country,
        country_code: country._id.country_code,
      })
    )

    return countries
  } catch (error) {
    console.error("GQL Fetching Disting countries", error)
  }
}

/**
 * Function to determine the number of stays based on
 * various filters
 */
export const fetchCountListing = async (q: IQGeneral): Promise<string> => {
  try {
    const count = await Listing.countDocuments(q.query).exec()
    return count > 300 ? "300+" : count.toString()
  } catch (error) {
    console.error("GQL Fetch Count Listing Error", error)
  }
}

const fetchListings = async (q: IQGeneral): Promise<IListingWithCount> => {
  console.log("[Log] GQL Fetch one Country Related Listings", JSON.stringify(q))
  try {
    const countries: IListing[] = await Listing.find(q.query)
      .limit(10)
      .skip(q.skip)
      .limit(q.limit)

    const count: string = await fetchCountListing(q)
    const countryLocation: ICountryLocation = await fetchOneCountry(
      q.query["address.country_code"]
    )
    return {
      listing: countries,
      stays: count,
      countryLocation: countryLocation,
    }
  } catch (error) {
    console.error("GQL Fetch one country Error", error)
  }
}

/**
 * Listing falling under one country code
 * @param code country code
 * @returns List
 */
export const fetchCountryListing = async (
  gqlParam: gqlListing
): Promise<IListingWithCount> => {
  console.log("[Log] GQL one Country: Raw Params", gqlParam)
  const mongooseQParam = keyChange(gqlParam.query)
  const mongooseQ: IQGeneral = {
    query: mongooseQParam,
    limit: gqlParam.limit,
    skip: gqlParam.skip,
  }
  return fetchListings(mongooseQ)
}

export const fetchDistinctAmenities = async (): Promise<string[]> => {
  try {
    const amenities: Array<string> = await Listing.distinct("amenities")
    console.log("GQL Count Distinct Amenities:", amenities.length)
    return amenities
  } catch (error) {
    console.error("GQL Fetch Disting Amenities Error", error)
  }
}

export const fetchDistinctPropertyTypes = async (): Promise<string[]> => {
  try {
    const properties: Array<string> = await Listing.distinct("property_type")
    console.log("GQL Count Distinct Property Types:", properties.length)
    return properties
  } catch (error) {
    console.error("GQL Fetch Disting Property Types Error", error)
  }
}

export const fetchDistinctRoomTypes = async (): Promise<string[]> => {
  try {
    const room: Array<string> = await Listing.distinct("room_type")
    console.log("GQL Count Distinct Room Types:", room.length)
    return room
  } catch (error) {
    console.error("GQL Fetch Disting Room Types Error", error)
  }
}
