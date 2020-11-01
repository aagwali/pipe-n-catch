import fs from "fs"

import { logger } from "@df/prod-http-server"

import { jobConfig } from "./config"
import { AppExit, ExecutionResult, ExitLevel } from "./types"

export const endJobAs = (level: ExitLevel, message: string): void => {
  if (level === ExitLevel.Error) {
    jobConfig.apmTransaction.result = ExitLevel.Error
    logger.error(message)
  } else if (level === ExitLevel.Warning) {
    jobConfig.apmTransaction.result = ExitLevel.Warning
    logger.warning(message)
  } else {
    jobConfig.apmTransaction.result = ExitLevel.Success
    jobConfig.logInfo(message)
  }
  jobConfig.apmTransaction.end()
}

export const createContainerTmp = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export const formatErrorToAppExit = (jobExit: AppExit | Error) =>
  jobExit instanceof AppExit ? jobExit : new AppExit(ExecutionResult.UnexpectedExit, jobExit)
