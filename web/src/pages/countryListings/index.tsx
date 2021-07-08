import AppBar from "./../../components/AppBar"
import Listings from "./Listings"
import { CountryListingProvider } from "./dataContext";

export default function CountryListings() {

   return (
      <CountryListingProvider>
         <AppBar />
         <Listings />
      </CountryListingProvider>
   )
}