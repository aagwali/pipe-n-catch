import { array, object, string } from "decoders"
import { RandomNumberErrors } from "../randomNumber/types"

export type Config = {
  minRandom: string
  maxRandom: string
  maxConcurrency: string
  nodeEnv: string
}

export type StateKeyOutput<T> = Promise<{ output: T }>

export type Output = {
  starshipInfos: string
  famousPilots: string[]
}

export type ErrorLabels = RandomNumberErrors

export const configGuard = object({
  minRandom: string,
  maxRandom: string,
  maxConcurrency: string,
  nodeEnv: string,
})

export const outputGuard = object({
  starshipInfos: string,
  famousPilots: array(string),
})
