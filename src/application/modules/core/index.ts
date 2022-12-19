import { process, process2 } from "./privates"

export const useData = (data: string): string => {
  const step = process(data)

  const finalStep = step ?? process2(data)

  return finalStep
}
