import AppBar from "./../../components/AppBar"
import HomeContents from "./Contents"

export default function Home() {

   return (
      <div>
         <AppBar
            barPosition={"fixed"}
         />
         <HomeContents />
      </div>
   )
}