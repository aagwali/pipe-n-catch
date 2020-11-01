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
  tmpDir: string
  mountVec: string
  bamClientEnv: string
  damClientEnv: string
  damApiKey: string
  fileExporterApiUrl: string
}

export type JobData = {
  id: string
  scopelock: string
}

export enum ExecutionResult {
  UnexpectedExit = "Unexpected",
  ApplicationSuccess = "Application succeded with",
}

export type ExitLabels = ExecutionResult

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
