import AppBar from "./../../components/AppBar"
import { MyHelmet } from "./../../components/MyHelmet"
import HomeContents from "./Contents"

export default function Home() {

   return (
      <div>
         <MyHelmet title="Remesha Airbnb Demo" description="Remesha Airbnb Demo" />
         <AppBar
            barPosition={"fixed"}
         />
         <HomeContents />
      </div>
   )
}