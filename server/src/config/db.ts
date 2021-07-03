import { connect } from "mongoose"

/**
 * On Launching the server, open a DB connection
 */
export const dbConnect = async() => {
   try {
      const conn = await connect(
         process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
         }
      )
      console.log(`MongoDB connected: ${conn.connection.host}`)
   } catch (error) {
      console.error(error)
   }
}
