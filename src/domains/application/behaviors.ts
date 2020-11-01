import fs from "fs"
import { AppExit, ExecutionResult, ExitLevel } from "./types"
import { logger } from "@df/prod-http-server"

export const endJobAs = (level: ExitLevel, transaction: any, message: string): void => {
  if (level === ExitLevel.Error) {
    transaction.result = ExitLevel.Error
    logger.error(message)
  } else if (level === ExitLevel.Warning) {
    transaction.result = ExitLevel.Warning
    logger.warning(message)
  } else {
    transaction.result = ExitLevel.Success
    logger.info(message)
  }
  transaction.end()
}

export const createContainerTmp = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export const formatErrorToAppExit = (jobExit: AppExit | Error) =>
  jobExit instanceof AppExit ? jobExit : new AppExit(ExecutionResult.UnexpectedExit, jobExit)
