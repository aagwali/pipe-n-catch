export enum UtilsErrors {
  BadRandomResult = "Not allowed as randomResult",
}

export type RandomResult<T> = Promise<{ randomResult: T }>
