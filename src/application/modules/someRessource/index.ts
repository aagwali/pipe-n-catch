import { extractResult } from "./privates"
import { someApiCallSuccess } from "./services"

export const getAsyncData = async (string: unknown): Promise<number[]> => {
  const apiResult = await someApiCallSuccess(string)

  const result = extractResult(apiResult)

  return result
}
