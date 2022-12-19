import { exitAs } from "../../../exits"
import { concat, isEmpty, isMySelection, parseStringToObject, takeFirst, toParsableString } from "./privates"
import { CoreExceptions } from "./types"

export const formatInputData = (arg1: string, arg2: string): string => {
  const concatened = concat(arg1, arg2)

  return concatened
}

export const buildParsableString = (value: unknown): string => {
  const parsableString = toParsableString(value)

  return parsableString
}

export const parseString = (value: string): Record<string, unknown> => {
  const jsObject = parseStringToObject(value)

  return jsObject
}

export const selectSpecificResult = (numbers: number[], selection: number): number[] => {
  const selectionResult = numbers.filter((number) => isMySelection(selection, number))

  if (isEmpty(selectionResult)) exitAs(CoreExceptions.FilterIsEmpty, { isError: false })

  return selectionResult
}

export const extractResult = (result: number[]): number => takeFirst(result)
