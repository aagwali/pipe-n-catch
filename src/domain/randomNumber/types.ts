export enum RandomNumberErrors {
  ExcludedRandomResult = "is masked by the dark side of the force",
}

export type StateKeyRandomResult<T> = Promise<{ randomResult: T }>
