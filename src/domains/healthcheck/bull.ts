import Bull from "bull"

import { bullQueueCheckCallback } from "@df/healthcheck-bull"
import { logger } from "@df/prod-http-server"

export const bullQueueDependencyConfig = (bullInstance: Bull.Queue<any>, healthchecksCacheDurationSeconds: number) => ({
  name: "bull",
  critical: true,
  delayed: false,
  intervalMilliseconds: healthchecksCacheDurationSeconds * 1000,
  checkCallback: bullQueueCheckCallback(logger.error, bullInstance),
})
