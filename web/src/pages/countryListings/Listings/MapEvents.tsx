import { useContext } from "react"
import { useMapEvents, useMap } from "react-leaflet"
import L from "leaflet"

import { IListing } from "../../../types/Listing"
import { CountryListingContext } from "../dataContext"

interface MapEventProps {
   moveTrigger: React.MutableRefObject<boolean>,
   loads: React.MutableRefObject<number>
}
export const MapLoad = (props: MapEventProps) => {
   const { data } = useContext(CountryListingContext)
   const map = useMap()
   props.moveTrigger.current = false

   console.log("Loaded! Move Trigger?", props.moveTrigger)
   let locations: [number, number][] = []
   data?.countryListings.listing.map((listing: IListing) => {
      locations.push([listing.address.location.coordinates[1], listing.address.location.coordinates[0]])
      return null
   })
   if (locations.length > 0) {
      let bounds = new L.LatLngBounds(locations)
      if (props.loads.current === 0) {
         map?.fitBounds(bounds)
         console.log("Map centered")
      }
   }
   props.moveTrigger.current = true
   console.log("Loading complete! Move Trigger?", props.moveTrigger)
   if (data !== null && data !== undefined) props.loads.current++
   console.log("Loadcount", props.loads.current)
   return null
}

export const MapEvents = (props: MapEventProps) => {
   const { filters, setFilters } = useContext(CountryListingContext)
   const map = useMapEvents({
      moveend: () => {
         let bound = map.getBounds()
         console.log("Move End Event captured: NE Point:", bound.getNorthEast())
         if (filters !== null && filters !== undefined && props.moveTrigger.current) {
            console.log("change filters")
            setFilters({
               ...filters,
               query: {
                  ...filters.query,
                  location: {
                     coordinates: {
                        ne_lng: bound.getNorthEast().lng,
                        ne_lat: bound.getNorthEast().lat,
                        nw_lng: bound.getNorthWest().lng,
                        nw_lat: bound.getNorthWest().lat,
                        sw_lng: bound.getSouthWest().lng,
                        sw_lat: bound.getSouthWest().lat,
                        se_lng: bound.getSouthEast().lng,
                        se_lat: bound.getSouthEast().lat
                     }
                  }
               }
            })
         }
      },
   })
   return null
}
