import * as Bam from "./domains/bam"
import * as DamClient from "@df/dam-client"
import mongoose from "mongoose"
import packageInfo from "../package.json"
import { AccessType } from "@df/healthcheck-fs"
import { appConfig, validateConfig } from "./domains/application/config"
import { bullQueueDependencyConfig } from "./domains/monitoring/bull"
import { createContainerTmp } from "./domains/application/behaviors"
import { fsDependencyConfig } from "./domains/monitoring/fs"
import { getQueue } from "./domains/bull"
import { handleJob } from "."
import { httpDependencyConfig } from "./domains/monitoring/http"
import { logger, startServer } from "@df/prod-http-server"

const startExpressServer = async () => {
  const bullQueue = await getQueue(appConfig)
  const cacheDuration = appConfig.healthchecksCacheDurationSeconds
  startServer(
    10010,
    [
      bullQueueDependencyConfig(bullQueue, cacheDuration),
      fsDependencyConfig("tmp", appConfig.tmpDir, AccessType.ReadWrite, cacheDuration),
      fsDependencyConfig("mountVentesEnCours", appConfig.mountVec, AccessType.Read, cacheDuration),
      httpDependencyConfig("fileExporterApi", `${appConfig.fileExporterApiUrl}/healthcheck`, cacheDuration),
    ],
    async () => {
      await mongoose.disconnect()
      await bullQueue.close()
    },
  )
}

export const initApp = async (): Promise<void> => {
  try {
    validateConfig()
    DamClient.configure(appConfig.damClientEnv, appConfig.damApiKey, packageInfo.name)
    Bam.configureClient(appConfig.bamClientEnv)
    createContainerTmp(appConfig.tmpDir)
    startExpressServer()
    await handleJob()
  } catch (error) {
    logger.error(error)
  } finally {
    process.exit(1)
  }
}
