import { appConfig } from "../application"
import { ErrorLabels } from "../application/types"
import { buildErrorMessage } from "../application/behaviors"
import { Decoder, guard } from "decoders"
import { logAs, logDebug } from "../chalkLogs"
import { State } from "./types"

export let state: State = {
  randomResult: null,
  starship: null,
  pilots: null,
  output: null,
}

export const decodeToState = async <T>(
  fun: () => Promise<T>,
  stateKey: string,
  stateKeyModel: Decoder<any, unknown>
): Promise<T> => {
  try {
    const functionResult = await fun()
    const resultKey = Object.keys(functionResult)[0]
    if (resultKey !== stateKey) {
      throw Error(
        `unable to set state key "${stateKey}" with function result key is : "${resultKey}"`
      )
    }
    if (appConfig.nodeEnv !== "production") {
      logAs("Application Info", `setting state key : "${stateKey}"...`)
    }
    guard(stateKeyModel)(functionResult[stateKey])
    if (appConfig.nodeEnv !== "production") {
      console.info("done")
    }
    return functionResult
  } catch (error) {
    logDebug(`error at setState({ ${stateKey} })`)
    throw error
  }
}

export const setState = (decoder: Record<string, Decoder<any, unknown>>) => async <T>(
  fun: () => Promise<T>
): Promise<T> => {
  const stateKey = Object.keys(decoder)[0]
  const stateKeyModel = decoder[stateKey]
  const functionResult = await decodeToState(fun, stateKey, stateKeyModel)
  state = { ...state, ...functionResult }

  return functionResult
}

export const getStateKey = <T>(x: T): T => {
  if (x == null) {
    throw Error("trying to access a state key that has not been set yet")
  } else {
    return x
  }
}

export const raiseErrorWhen = <T>(value: T, predicate: (x: T) => boolean) => async (
  code: ErrorLabels
): Promise<void> => {
  if (predicate(value)) {
    throw Error(buildErrorMessage(code, value))
  }
}

export const defaultWhenValue = <T>(predicate: (x: T) => boolean, fallback: T) => (value: T): T => {
  if (predicate(value)) {
    return fallback
  } else {
    return value
  }
}

export const defaultWhenError = <T>(
  predicate: (x: Error) => boolean,
  fallback: (x: Error) => T
) => (value: Error): T => {
  if (predicate(value)) {
    return fallback(value)
  } else {
    throw value
  }
}
