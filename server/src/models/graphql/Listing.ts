import { IListing, Listing } from "../mongoose/Listing"

interface IAggregation{
   _id:{
      country : String,
      country_code : String
   }
}
interface ICountries{
   country : String,
   country_code : String

}

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
   let countries: ICountries[] = []
   try {
      const distinctCountry: IAggregation[] = await Listing.aggregate([{
         $group:{
            _id:{
               country: "$address.country",
               country_code: "$address.country_code"
            }
         }
      }])
      distinctCountry.map((country)=>countries.push({
         country: country._id.country,
         country_code: country._id.country_code
      }))

      return countries
   } catch (error) {
      console.error("GQL Fetching Disting countries",error)
   }
}

export const fetchCountryListing = async(code: String)=>{
   console.log("GQL Fetch one Country Related Listings",code)
   try {
      const countries: IListing[] = await Listing.find({"address.country_code":code}).limit(20)
      return countries
   } catch (error) {
      console.error("GQL Fetch one country Error", error)      
   }
}