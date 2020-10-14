import { guard, object, string } from "decoders"
import { PcmProductView, PcmErrors } from "../pcm/types"
import { UtilsErrors } from "../utils/types"

export type Config = {
  confVar: string
  randomFloor: string
}

export type AppState = {
  randomResult: number
  productView: PcmProductView
}

export type State<T> = Promise<T>

export type ErrorLabels = PcmErrors | UtilsErrors

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
  confVar: string,
  randomFloor: string,
})

export const decodeConfig = guard(configGuard)
