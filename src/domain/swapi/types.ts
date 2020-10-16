import { array, Decoder, number, object, string } from "decoders"

export type Starship<T> = Promise<{ starship: T }>

export type SwapiStarship = {
  name: string
  model: string
  manufacturer: string
  hyperdrive_rating: string
  starship_class: string
  pilots: string[]
}

export const swapiStarship: Decoder<any, unknown> = object({
  name: string,
  model: string,
  manufacturer: string,
  hyperdrive_rating: string,
  starship_class: string,
  pilots: array(string)
})
