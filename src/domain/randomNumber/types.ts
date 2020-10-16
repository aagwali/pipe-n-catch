export enum UtilsErrors {
  ExcludedRandomResult = "is masked by the dark side of the force",
}

export type RandomResult<T> = Promise<{ randomResult: T }>
