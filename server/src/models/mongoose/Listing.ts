import { Schema,model } from "mongoose"

export interface IListing {
   _id: String,
   listing_url: String,
   name: String,
   summary: String,
   space: String,
   description: String,
   neighborhood_overview: String,
   notes: String,
   transit: String,
   access: String,
   interaction: String,
   house_rules: String,
   property_type: String,
   room_type: String,
   bed_type: String,
   minimum_nights: String,
   maximum_nights: String,
   cancellation_policy: String,
   last_scraped: Date,
   calendar_last_scraped: Date,
   first_review: Date,
   last_review: Date,
   accomodates:Number,
   beds: Number,
   number_of_reviews: Number,
   bathroms: Schema.Types.Decimal128,
   address: {
      street: String,
      suburb: String,
      government_area: String,
      market: String,
      country: String,
      country_code: String,
      location:{
         type: String,
         coordinates: [Number],
         is_location_exact: Boolean
      },
   }
}

const pointSchema = new Schema({
   type: {
     type: String,
     enum: ['Point'],
     required: true
   },
   coordinates: {
     type: [Number],
     required: true
   },
   is_location_exact: Boolean
 })
 
const listingSchema = new Schema<IListing>({
      _id: String,
      listing_url: String,
      name: String,
      summary: String,
      space: String,
      description: String,
      neighborhood_overview: String,
      notes: String,
      transit: String,
      access: String,
      interaction: String,
      house_rules: String,
      property_type: String,
      room_type: String,
      bed_type: String,
      minimum_nights: String,
      maximum_nights: String,
      cancellation_policy: String,
      last_scraped: Date,
      calendar_last_scraped: Date,
      first_review: Date,
      last_review: Date,
      accomodates:Number,
      beds: Number,
      number_of_reviews: Number,
      bathroms: Schema.Types.Decimal128,
      address: {
         street: String,
         suburb: String,
         government_area: String,
         market: String,
         country: String,
         country_code: String,
         location:pointSchema
      }
   },{
      collection: "listingsAndReviews"
   })

export const Listing = model<IListing>("Listing",listingSchema)