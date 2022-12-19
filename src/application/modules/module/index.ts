import { exitAs } from "../../../exits"
import { fetchData } from "./services"
import { ModuleEntity, ModuleExceptions } from "./types"

export const getData = async (): Promise<ModuleEntity> => {
  const { result } = await fetchData()

  if (result !== "someData") {
    exitAs(ModuleExceptions.IsNotSomeData, { isError: false, data: result })
  }

  return result
}
