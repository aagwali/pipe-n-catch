export enum UtilsErrors {
  BadRandomResult = "Not allowed as randomResult",
}

export type randomResult<T> = Promise<{ randomResult: T }>
