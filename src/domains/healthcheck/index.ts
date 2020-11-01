import { AccessType } from "@df/healthcheck-fs"

import { AppQueue, Config } from "../application/types"
import { bullQueueDependencyConfig } from "./bull"
import { fsDependencyConfig } from "./fs"
import { httpDependencyConfig } from "./http"

export const getHealthchecks = (queue: AppQueue, cacheDuration: number, appConfig: Config) => [
  bullQueueDependencyConfig(queue, cacheDuration),
  fsDependencyConfig("tmp", appConfig.tmpDir, AccessType.ReadWrite, cacheDuration),
  fsDependencyConfig("mountVentesEnCours", appConfig.mountVec, AccessType.Read, cacheDuration),
  httpDependencyConfig("fileExporterApi", `${appConfig.fileExporterApiUrl}/healthcheck`, cacheDuration),
]
