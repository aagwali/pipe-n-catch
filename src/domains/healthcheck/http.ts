import { httpCheckCallback } from "@df/healthcheck-http"
import { logger } from "@df/prod-http-server"
// a http call to the given uri without adding headers
export const httpDependencyConfig = (name: string, url: string, healthchecksCacheDurationSeconds: number) => ({
  name: name,
  critical: true,
  delayed: false,
  intervalMilliseconds: healthchecksCacheDurationSeconds * 1000,
  checkCallback: httpCheckCallback(url, null, logger.error),
})
