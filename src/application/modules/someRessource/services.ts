export const someApiCallSuccess = async (string: unknown): Promise<Record<string, number[]>> => ({
  response: [1, 2, 3],
})

export const someApiCallFailure = async (string: unknown): Promise<Record<string, number[]>> =>
  Promise.reject(Error("someApiError"))
