import { IListing, Listing } from "../mongoose/Listing"

/**
 * GQL Resolver to fetch only one Listing based on the ID
 * 
 * @param id Listing ID
 * @returns A listing and Review Document
 */
export const fetchOneListing = async(id: String) => {
   console.log("GQL: One Listing Query with ID:",id)
   try {
      const one: IListing = await Listing.findById(id)
      // console.log("We're done!",one)
      return one      
   } catch (error) {
      console.error(error)
   }
}

export const fetchDistinctCountries = async() =>{
   console.log("GQL Fetch Distinct Countries")
   try {
      const distinctCountry = await Listing.aggregate([{
         $group:{
            _id:{
               country: "$address.country",
               country_code: "$address.country_code"
            }
         }
      }])
      return distinctCountry
   } catch (error) {
      console.error("GQL Fetching Disting countries",error)
   }
}