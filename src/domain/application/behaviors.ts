import { RandomNumberErrors } from "../randomNumber/types"
import { setState } from "../state"
import { SwapiStarship, SwapiPilots } from "../swapi/types"
import { ErrorLabels, Output, StateKeyOutput } from "./types"

export const buildErrorMessage = (error: ErrorLabels, value?: any): string | undefined => {
  switch (error) {
    case RandomNumberErrors.ExcludedRandomResult:
      return `value "${value}" : ${RandomNumberErrors.ExcludedRandomResult}`
    default: {
      ;((missingErrorCase: never) => "")(error)
    }
  }
}




export const isStatusCode = (statusCode: number) => (error: any): boolean => {
  return error.statusCode === statusCode
}
