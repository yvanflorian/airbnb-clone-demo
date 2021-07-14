type gqlGreaterThan = {
  gte: number
}
type gqlArrayMatch = {
  all: string[]
}

type gqlObjectIn = {
  in: string[]
}

interface gqlQuery {
  country: string
  name?: string
  beds?: gqlGreaterThan
  bathrooms?: gqlGreaterThan
  bedrooms?: gqlGreaterThan
  guests_included?: gqlGreaterThan
  property_type?: gqlObjectIn
  room_type?: gqlObjectIn
  is_superhost?: boolean
  amenities?: gqlArrayMatch
}
export interface gqlListing {
  query: gqlQuery
  limit: number
  skip: number
}

interface IGreaterThan {
  $gte: gqlGreaterThan["gte"]
}
interface IArrayMatch {
  $all: gqlArrayMatch["all"]
}

interface IObjectIn {
  $in: gqlObjectIn["in"]
}
export interface IQObject {
  "address.country_code": gqlQuery["country"]
  name?: gqlQuery["name"]
  beds?: IGreaterThan
  bathrooms?: IGreaterThan
  bedrooms?: IGreaterThan
  guests_included?: IGreaterThan
  property_type?: IObjectIn
  room_type?: IObjectIn
  "host.host_is_superhost"?: gqlQuery["is_superhost"]
  amenities?: IArrayMatch
}

export interface IQGeneral {
  query: IQObject
  limit: number
  skip: number
}

/**
 * rename key objects coming from graphql(as they contain keywords like $)
 * before passing them to mongoose
 */
export const keyChange = ({
  country,
  beds,
  bathrooms,
  bedrooms,
  guests_included,
  is_superhost,
  amenities,
  property_type,
  room_type,
  ...remainder
}: gqlQuery): IQObject => {
  const final: IQObject = {
    "address.country_code": country,
  }
  beds ? (final.beds = { $gte: beds.gte }) : null
  bathrooms ? (final.bathrooms = { $gte: bathrooms.gte }) : null
  bedrooms ? (final.bedrooms = { $gte: bedrooms.gte }) : null
  guests_included
    ? (final.guests_included = { $gte: guests_included.gte })
    : null
  is_superhost ? (final["host.host_is_superhost"] = is_superhost) : null
  amenities ? (final.amenities = { $all: amenities.all }) : null
  property_type ? (final.property_type = { $in: property_type.in }) : null
  room_type ? (final.room_type = { $in: room_type.in }) : null

  return final
}
