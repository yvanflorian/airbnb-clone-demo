import AppBar from "./../../components/AppBar"
import { MyHelmet } from "./../../components/MyHelmet"
import HomeContents from "./Contents"
import { Footer } from "./../../components/Footer"

export default function Home() {

   return (
      <div>
         <MyHelmet title="Remesha Airbnb Demo" description="Remesha Airbnb Demo" />
         <AppBar
            barPosition={"fixed"}
         />
         <HomeContents />
         <Footer />
      </div>
   )
}