import * as DamClient from "@df/dam-client"
import { logger, startServer } from "@df/prod-http-server"

import packageInfo from "../package.json"
import { handleJob } from "./"
import { appConfig, validateConfig } from "./domains/application/config"
import { AppQueue } from "./domains/application/types"
import * as BamClient from "./domains/bam"
import { getQueue } from "./domains/bull"
import { getHealthchecks } from "./domains/healthcheck"

const startMonitoringServer = async (queue: AppQueue) =>
  startServer(10010, getHealthchecks(queue, appConfig.healthchecksCacheDurationSeconds, appConfig), async () => {
    await queue.close()
  })

export const initApp = async (): Promise<void> => {
  try {
    await validateConfig()
    DamClient.configure(appConfig.damClientEnv, appConfig.damApiKey, packageInfo.name)
    BamClient.configure(appConfig.bamClientEnv)
    const queue = await getQueue(appConfig)
    startMonitoringServer(queue)
    await handleJob(queue)
  } catch (err) {
    logger.error({ err }, "InitApp error")
  }
}
