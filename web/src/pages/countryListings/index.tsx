import AppBar from "./../../components/AppBar"
import { Footer } from "./../../components/Footer"
import { ListingBottomBar } from "./Listings/ListingBottomBar"
import { ListingTopBar } from "./Listings/ListingTopBar"
import Listings from "./Listings"
import { CountryListingProvider } from "./dataContext";

export default function CountryListings() {

   return (
      <CountryListingProvider>
         <AppBar
            barPosition={"fixed"}
         />
         <ListingTopBar />
         <Listings />
         <ListingBottomBar />
         <Footer />
      </CountryListingProvider>
   )
}