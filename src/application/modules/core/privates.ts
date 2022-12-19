const subProcess = (data: string): string => data

export const process = (data: string): string => {
  // map, filter, spread
  return `${data} - processed`
}

export const process2 = (data: string): string => {
  const intermediateStep = subProcess(data)
  return `${intermediateStep} - processed 2`
}

export const switchIsExhaustive = (_: never) =>
  "Placed as default case, argument raises a ts(2345) error for every missing case"
