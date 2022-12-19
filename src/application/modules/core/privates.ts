export const concat = (string1: string, string2: string): string => `${string1} ${string2}`

export const toParsableString = (arg: unknown): string => `{"someKey":"${arg}"}`

export const parseStringToObject = (string: string): Record<string, any> => JSON.parse(string)

export const isEmpty = (list: unknown[]): boolean => !list?.length

export const isMySelection = (selectedNumber: number, number: number): boolean => number === selectedNumber

export const takeFirst = <T>(list: T[]): T => list[0]
