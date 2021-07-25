import { Schema, model } from "mongoose"

export interface ICountryLocation {
  long_name: String
  short_name: String
  center_lat: String
  center_lng: String
  sw_lat: String
  sw_lng: String
  ne_lat: String
  ne_lng: String
}

const countriesSchema = new Schema<ICountryLocation>(
  {
    long_name: String,
    short_name: String,
    center_lat: String,
    center_lng: String,
    sw_lat: String,
    sw_lng: String,
    ne_lat: String,
    ne_lng: String,
  },
  {
    collection: "countryLocations",
  }
)

export const Country = model<ICountryLocation>(
  "countryLocations",
  countriesSchema
)
