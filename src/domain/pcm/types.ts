import { array, Decoder, number, object, string } from "decoders"

export enum PcmErrors {
  NotFound = "api error 404 not found",
  Conflict = "api error 409 conflict",
  InvalidResponse = "invalid response throw",
}

export type ProductView<T> = Promise<{ productView: T }>

export type PcmProductView = {
  id: number
  product_family_id: number
  type_id: string
  number: number
  dam_view: {
    document_uuid: string
  }[]
}

export const pcmProductView: Decoder<any, unknown> = object({
  id: number,
  product_family_id: number,
  number: number,
  dam_view: array(
    object({
      document_uuid: string,
    })
  ),
})
