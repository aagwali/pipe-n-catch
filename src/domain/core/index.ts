import { AppState, Config, ErrorLabels, SetStateOption } from "./types"
import { buildErrorMessage, stateError } from "./behaviors"
import { Decoder, guard } from "decoders"
import { logAs, logDebug } from "../logs"

export const appConfig: Config = {
  minRandom: process.env.MIN_RANDOM,
  maxRandom: process.env.MAX_RANDOM,
}

export let appState: AppState = {
  randomResult: null,
  starship: null,
}

export const decodeToState = async <T>(
  fun: () => Promise<T>,
  stateKey: string,
  stateKeyModel: Decoder<any, unknown>
): Promise<T> => {
  try {
    const functionResult = await fun()
    guard(stateKeyModel)(functionResult[stateKey])
    return functionResult
  } catch (error) {
    logDebug(`error at setState({ ${stateKey} })`)
    throw error
  }
}

export const setState = (
  decoder: Record<string, Decoder<any, unknown>>,
  option?: SetStateOption
) => async <T>(fun: () => Promise<T>): Promise<T> => {
  try {
    const stateKey = Object.keys(decoder)[0]
    const stateKeyModel = decoder[stateKey]
    const functionResult = await decodeToState(fun, stateKey, stateKeyModel)
    if (option?.log) logAs("Application Info")(`success log emmitted : setState({ ${stateKey} })`)
    appState = { ...appState, ...functionResult }
    return functionResult
  } catch (error) {
    if (option?.log) logAs("Application Info")("error log emmitted : {state , error} ")
    return stateError(error)
  }
}

export const getState = <T>(x: T): T => {
  if (x == null) {
    stateError(Error("using of a state key not set yet"))
  } else {
    return x
  }
}

export const raiseWhen = <T>(value: T, predicate: (x: T) => boolean) => async (
  code: ErrorLabels
): Promise<void> => {
  if (predicate(value)) {
    throw Error(buildErrorMessage(code, value))
  }
}

export const defaultWhen = <T>(predicate: (x: T) => boolean, fallback: T) => (value: T): T => {
  if (predicate(value)) {
    return fallback
  } else {
    return value
  }
}

export const handleWhen = <T, U>(predicate: (x: Error) => boolean, fallback: (x: Error) => T) => (
  value: Error
): T => {
  if (predicate(value)) {
    return fallback(value)
  } else {
    throw value
  }
}

export const isHttpErrorStatus = (statusCode: number) => (httpError: any): boolean => {
  return httpError.statusCode === statusCode
}
