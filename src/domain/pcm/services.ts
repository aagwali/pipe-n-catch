import { mockResponse } from "../../_mocks"

export const getProductViewById = async (randomResult: number): Promise<any> =>
  randomResult === 3
    ? Promise.reject(Error("api error 409 conflict"))
    : randomResult === 2
    ? Promise.reject(Error("api error 404 not found"))
    : mockResponse
