import * as BamClient from "./domains/bam"
import * as DamClient from "@df/dam-client"
import mongoose from "mongoose"
import packageInfo from "../package.json"
import { appConfig, validateConfig } from "./domains/application/config"
import { createContainerTmp } from "./domains/application/behaviors"
import { getQueue } from "./domains/bull"
import { handleJob } from "."
import { logger, startServer } from "@df/prod-http-server"
import { getHealthchecks } from "./domains/healthcheck"
import Bull from "bull"

const startMonitoringServer = async (bullQueue: Bull.Queue<any>) => {
  startServer(10010, getHealthchecks(bullQueue, appConfig.healthchecksCacheDurationSeconds, appConfig), async () => {
    await mongoose.disconnect()
    await bullQueue.close()
  })
}

export const initApp = async (): Promise<void> => {
  try {
    validateConfig()
    DamClient.configure(appConfig.damClientEnv, appConfig.damApiKey, packageInfo.name)
    BamClient.configure(appConfig.bamClientEnv)
    createContainerTmp(appConfig.tmpDir)
    const queue = await getQueue(appConfig)
    startMonitoringServer(queue)
    await handleJob(queue)
  } catch (error) {
    logger.error(error)
  } finally {
    process.exit(1)
  }
}
