import { logger } from "@df/prod-http-server"
import { bullQueueCheckCallback } from "@df/healthcheck-bull"
import Bull from "bull"

export const bullQueueDependencyConfig = (bullInstance: Bull.Queue<any>, healthchecksCacheDurationSeconds: number) => ({
  name: "bull",
  critical: true,
  delayed: false,
  intervalMilliseconds: healthchecksCacheDurationSeconds * 1000,
  checkCallback: bullQueueCheckCallback(logger.error, bullInstance),
})
