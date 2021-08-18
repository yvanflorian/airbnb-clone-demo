import AppBar from "./../../components/AppBar"
import { Footer } from "./../../components/Footer"
import { MyHelmet } from "./../../components/MyHelmet"
import { RoomProvider } from "./dataContext"
import { RoomContents } from "./RoomContents"

export default function Room() {
   return (
      <RoomProvider>
         <MyHelmet
            title="Remesha Airbnb Room"
            description="Remesha Airbnb Room"
         />
         <AppBar barPosition="absolute" />
         <RoomContents />
         <Footer />
      </RoomProvider>
   )

}