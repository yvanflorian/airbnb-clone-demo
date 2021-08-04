import * as express from "express"
// import { config } from "dotenv"
import { ApolloServer } from "apollo-server-express"
//
import { dbConnect } from "./config/db"
import { typeDefs, resolvers } from "./models/graphql"

// const loadEnv = config()
// if (loadEnv.error) {
//   throw loadEnv.error
// }

const app = express()

app.get("/", (req, res) => {
  res.send("Hello from Remesha Airbnb clone!")
})

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
})

server.applyMiddleware({ app })

const startServer = async (port) => {
  try {
    await dbConnect()
    app.listen(port, () => {
      console.log(`Server Listening at port ${port}`)
    })
    // await fetchDistinctCountries()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer(process.env.PORT || 8000)
