export const logInfo = (message: string, extraInfos?: Record<string, any>): void =>
  console.info(message, extraInfos ?? "")

export const logWarning = (message: string, extraInfos?: Record<string, any>, error?: Error): void =>
  console.warn(message, extraInfos || "", error || "")

export const logError = (error: Error, message?: string, extraInfos?: Record<string, any>): void =>
  console.error(error, message || "", extraInfos || "")
