import * as express from "express"
import { config } from "dotenv"
import { ApolloServer } from "apollo-server-express"
//
import { dbConnect } from "./config/db"
import { typeDefs, resolvers} from "./models/graphql"
import { IListing, Listing } from "./models/mongoose/Listing"

const loadEnv = config()
if(loadEnv.error){
   throw loadEnv.error
}

const app  = express()

const server = new ApolloServer({
   typeDefs: typeDefs,
   resolvers: resolvers
})

server.applyMiddleware({app})

export const fetchDistinctCountries = async() =>{
   console.log("GQL Fetch Distinct Countries")
   try {
      const countryListings: IListing[] = await Listing.find({
         "address.country": "Australia",
         name: "Surry Hills Studio - Your Perfect Base in Sydney"
      }).exec()
      countryListings.map((country)=>console.log("Country Listings:",country.listing_url))
      return countryListings 
   } catch (error) {
      console.error("GQL Fetching Disting countries",error)
   }
}

const startServer = async(port) => {
   try {
      await dbConnect()
      app.listen(port,()=>{
         console.log(`Server Listening at port ${port}`)
      })
      // await fetchDistinctCountries()
   } catch (error) {
      console.error(error)
      process.exit(1)
   }
}

startServer(process.env.PORT||8000)