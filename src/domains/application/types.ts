import Bull from "bull"

export type Config = {
  nodeEnv: string
  bullRedisUrl: string
  bullQueuName: string
  healthchecksCacheDurationSeconds: number
  elasticApmServerUrl: string
  environment: string
  fluentHost: string
  fluentPort: string
  fluentTag: string
  jobLockDuration: number
  jobLockRenewTime: number
  mountVec: string
  bamClientEnv: string
  damClientEnv: string
  damApiKey: string
  fileExporterApiUrl: string
}

export enum AppException {
  UnexpectedExit = "Unexpected App Exception :",
}

export type ExitLabels = AppException

export type JobData = {
  id: string
  scopelock: string
}

export type AppDoneCallback = Bull.DoneCallback

export type AppJob<T> = Bull.Job<T>

export type AppQueue<T = any> = Bull.Queue<T>

export enum ExitLevel {
  Error = "error",
  Warning = "warning",
  Success = "success",
}

export class AppExit extends Error {
  context: string | Error
  code: ExitLabels
  constructor(code: ExitLabels, context?: string | Error, message?: string) {
    super(message)
    this.context = context
    this.code = code
  }
}

export type AppExitOptions = { context?: string | Error }
