import * as Core from "./modules/core"
import * as SomeRessource from "./modules/someRessource"

export const startProcess = async (arg1: string, arg2: string): Promise<number> => {
  const formattedData = Core.formatInputData(arg1, arg2)

  const parsableString = Core.buildParsableString(formattedData)

  const jsObject = Core.parseString(parsableString)

  const someNumbers = await SomeRessource.getAsyncData(jsObject.someKey)

  const selectedResult = Core.selectSpecificResult(someNumbers, 1)

  const finalResult = Core.extractResult(selectedResult)

  return finalResult
}
