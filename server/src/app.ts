import express from "express"
import {config} from "dotenv"
import {ApolloServer} from "apollo-server-lambda"
//
import {dbConnect} from "./config/db"
import {typeDefs, resolvers} from "./models/graphql"

const loadEnv = config()
// if (process.env.NODE_ENV === "development"){
//    if (loadEnv.error) {
//      throw loadEnv.error
//    }
// }

const app = express()

app.get("/", (req, res) => {
	res.send("Hello from Remesha Airbnb clone!")
})

let connection: any
const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	csrfPrevention: true,
	cache: "bounded",
	context: async ({event, context}) => {
		context.callbackWaitsForEmptyEventLoop = false
		if (!connection) {
			console.log("Cold start!")
			connection = await dbConnect()
		}
		return connection
	}
})

//server.applyMiddleware({app})

//const startServer = async (port) => {
//try {
//await dbConnect()
//app.listen(port, () => {
//console.log(`Server Listening at port ${port}`)
//})
//// await fetchDistinctCountries()
//} catch (error) {
//console.error(error)
//process.exit(1)
//}
//}

//startServer(process.env.PORT || 8000)
//
export const graphqlHandler = server.createHandler()
