export interface IListing {
  _id: string
  listing_url: string
  name: string
  summary: string
  space: string
  description: string
  neighborhood_overview: string
  notes: string
  transit: string
  access: string
  interaction: string
  house_rules: string
  property_type: string
  room_type: string
  bed_type: string
  minimum_nights: string
  maximum_nights: string
  cancellation_policy: string
  last_scraped: Date
  calendar_last_scraped: Date
  first_review: Date
  last_review: Date
  accomodates: Number
  beds: number
  bedrooms: number
  number_of_reviews: number
  bathroms: number
  amenities: [string]
  price: number
  weekly_price: Number
  monthly_price: Number
  cleaning_fee: Number
  extra_people: Number
  guests_included: number
  images: {
    thumbnail_url: string
    medium_url: string
    picture_url: string
    xl_picture_url: string
  }
  host: {
    host_id: string
    host_url: string
    host_name: string
    host_location: string
    host_about: string
    host_thumbnail_url: string
    host_picture_url: string
    host_neighbourhood: string
    host_is_superhost: boolean
    host_has_profile_pic: Boolean
    host_identity_verified: Boolean
    host_listings_count: Number
    host_total_listings_count: Number
    host_verifications: [string]
  }
  address: {
    street: string
    suburb: string
    government_area: string
    market: string
    country: string
    country_code: string
    location: {
      type: string
      coordinates: [number, number]
      is_location_exact: Boolean
    }
  }
  availability: {
    availability_30: Number
    availability_60: Number
    availability_90: Number
    availability_365: Number
  }
  review_scores: {
    review_scores_accuracy: Number
    review_scores_cleanliness: Number
    review_scores_checkin: Number
    review_scores_communication: Number
    review_scores_location: Number
    review_scores_value: Number
    review_scores_rating: number
  }
}
