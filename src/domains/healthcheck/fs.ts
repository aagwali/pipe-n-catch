import { AccessType, fsAccessCheckCallback } from "@df/healthcheck-fs"
import { logger } from "@df/prod-http-server"

export const fsDependencyConfig = (
  name: string,
  path: string,
  accessType: AccessType,
  healthchecksCacheDurationSeconds: number,
) => ({
  name,
  critical: true,
  delayed: false,
  intervalMilliseconds: healthchecksCacheDurationSeconds * 1000,
  checkCallback: fsAccessCheckCallback(logger.error, path, accessType),
})
