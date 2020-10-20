import { object, string } from "decoders"

export enum GenericDomainErrors {
  SomeManualErrorThrow = "the message to attach with the throw",
}

export type StateKeyGeneric<T> = Promise<{ generic: T }>

export type GenericResult = {
  someKey: string
}

export const genericResult = object({
  someKey: string,
})
