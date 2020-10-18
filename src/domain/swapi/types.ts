import { array, Decoder, object, string } from "decoders"

export type StateKeyStarship<T> = Promise<{ starship: T }>

export type StateKeyPilots<T> = Promise<{ pilots: T }>

export type SwapiStarship = {
  name: string
  model: string
  manufacturer: string
  hyperdrive_rating: string
  starship_class: string
  pilots: string[]
}

export type SwapiPilots = {
  name: "Luke Skywalker"
  height: "172"
  mass: "77"
  hair_color: "blond"
  skin_color: "fair"
  eye_color: "blue"
  gender: "male"
}

export const swapiStarship: Decoder<any, unknown> = object({
  name: string,
  model: string,
  manufacturer: string,
  hyperdrive_rating: string,
  starship_class: string,
  pilots: array(string),
})

export const swapiPilots: Decoder<any, unknown> = array(
  object({
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    gender: string,
  })
)
