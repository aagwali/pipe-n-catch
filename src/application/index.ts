import { logInfo } from "../infra/log"
import * as Core from "./modules/core"
import * as Module from "./modules/module"

export const startProcess = async (): Promise<string> => {
  logInfo("Start process")

  const assigned = await Module.getData()

  const processed = Core.useData(assigned)

  // Do something else in any Module

  return processed
}
