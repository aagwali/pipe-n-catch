import { guard, object, string } from "decoders"
import { SwapiStarship } from "../swapi/types"
import { UtilsErrors } from "../randomNumber/types"

export type Config = {
  minRandom: string
  maxRandom: string
}

export type AppState = {
  randomResult: number
  starship: SwapiStarship
}

export type State<T> = Promise<T>

export type ErrorLabels = UtilsErrors

export enum LogTypes {
  Fluent = "Fluent",
}

export type SetStateOption = { log: LogTypes }

export class StateError extends Error {
  debug: string
  constructor(message: string, debug?: string) {
    super(message)
    this.debug = debug
  }
}

export const configGuard = object({
  minRandom: string,
  maxRandom: string,
})

export const decodeConfig = guard(configGuard)
