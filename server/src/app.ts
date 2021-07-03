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

// export const fetchDistinctCountries = async() =>{
//    console.log("GQL Fetch Distinct Countries")
//    try {
//       const distinctCountry = await Listing.distinct("address.country")
//       console.log("Distinct countries are",distinctCountry)
//       const aggregation = await Listing.aggregate([{
//          $group:{
//             _id:{
//                country: "$address.country",
//                country_code: "$address.country_code"
//             }
//          }
//       }])
//       console.log("Distinct aggregation",aggregation)
//       return distinctCountry
//    } catch (error) {
//       console.error("GQL Fetching Disting countries",error)
//    }
// }

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