export type Config = {
  nodeEnv: string
}

export enum ExecutionResult {
  UnexpectedExit = "Unexpected",
  ApplicationSuccess = "Application succeded with",
}

export type ExitLabels = ExecutionResult

export enum ExitLevel {
  Error = "Error",
  Warning = "Warning",
  Success = "Success",
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
