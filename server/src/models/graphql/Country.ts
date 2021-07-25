import { ICountryLocation, Country } from "./../mongoose/Country"

export const fetchOneCountry = async (country: string) => {
  console.log("GQL: one Country Centroid", country)
  try {
    const one: ICountryLocation = await Country.findOne({
      short_name: country,
    }).exec()
    return one
  } catch (error) {
    console.error("Fetch one country Error:", error)
  }
}
