import { useContext } from "react"
import { useMapEvents, useMap } from "react-leaflet"
import L from "leaflet"
import { useHistory } from "react-router-dom"

import { IListing } from "../../../types/Listing"
import { CountryListingContext, useRouterQuery } from "../dataContext"

interface MapEventProps {
   moveTrigger: React.MutableRefObject<boolean>,
   loads: React.MutableRefObject<number>,
   searchAsIMove?: boolean
}
/**
 * Runs when the Map Loads
 * 
 * @param props 
 * @returns 
 */
export const MapLoad = (props: MapEventProps) => {
   const { data } = useContext(CountryListingContext)
   const map = useMap()
   props.moveTrigger.current = false

   // console.log("Loaded! Move Trigger?", props.moveTrigger)
   let locations: [number, number][] = []
   data?.countryListings.listing.map((listing: IListing) => {
      locations.push([listing.address.location.coordinates[1], listing.address.location.coordinates[0]])
      return null
   })
   if (locations.length > 0) {
      let bounds = new L.LatLngBounds(locations)
      if (props.loads.current === 0) {
         map?.fitBounds(bounds)
         // console.log("Map centered")
      }
   }
   props.moveTrigger.current = true
   // console.log("Loading complete! Move Trigger?", props.moveTrigger)
   if (data !== null && data !== undefined) props.loads.current++
   // console.log("Loadcount", props.loads.current)
   return null
}

/**
 * Contains the onMove Event in the map (which will refine the search)
 * @param props 
 * @returns 
 */
export const MapEvents = (props: MapEventProps) => {
   const { filters, setFilters } = useContext(CountryListingContext)
   let history = useHistory()
   let query = useRouterQuery()

   const map = useMapEvents({
      moveend: () => {
         if (props.searchAsIMove) {
            let bound = map.getBounds()
            let boundPosition = {
               ne_lng: bound.getNorthEast().lng,
               ne_lat: bound.getNorthEast().lat,
               nw_lng: bound.getNorthWest().lng,
               nw_lat: bound.getNorthWest().lat,
               sw_lng: bound.getSouthWest().lng,
               sw_lat: bound.getSouthWest().lat,
               se_lng: bound.getSouthEast().lng,
               se_lat: bound.getSouthEast().lat
            }
            // console.log("Move End Event captured: NE Point:", bound.getNorthEast())
            if (filters !== null && filters !== undefined && props.moveTrigger.current) {
               // console.log("change filters")
               if (query.has("ne_lng")) query.delete("ne_lng")
               if (query.has("ne_lat")) query.delete("ne_lat")
               if (query.has("nw_lng")) query.delete("nw_lng")
               if (query.has("nw_lat")) query.delete("nw_lat")
               if (query.has("sw_lng")) query.delete("sw_lng")
               if (query.has("sw_lat")) query.delete("sw_lat")
               if (query.has("se_lng")) query.delete("se_lng")
               if (query.has("se_lat")) query.delete("se_lat")
               query.append("ne_lng", boundPosition.ne_lng.toString())
               query.append("ne_lat", boundPosition.ne_lat.toString())
               query.append("nw_lng", boundPosition.nw_lng.toString())
               query.append("nw_lat", boundPosition.nw_lat.toString())
               query.append("sw_lng", boundPosition.sw_lng.toString())
               query.append("sw_lat", boundPosition.sw_lat.toString())
               query.append("se_lng", boundPosition.se_lng.toString())
               query.append("se_lat", boundPosition.se_lat.toString())

               if (query.has("mapselect")) query.delete("mapselect")
               query.append("mapselect", "true")

               setFilters({
                  ...filters,
                  query: {
                     ...filters.query,
                     location: {
                        coordinates: boundPosition
                     }
                  }
               })
               history.replace({
                  search: query.toString()
               })
            }
         }
      },
   })
   return null
}
