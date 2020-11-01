import Bull from "bull"
import { Config } from "../application/types"
import { bullQueueDependencyConfig } from "./bull"
import { fsDependencyConfig } from "./fs"
import { httpDependencyConfig } from "./http"
import { AccessType } from "@df/healthcheck-fs"

export const getHealthchecks = (bullQueue: Bull.Queue<any>, cacheDuration: number, appConfig: Config) => [
  bullQueueDependencyConfig(bullQueue, cacheDuration),
  fsDependencyConfig("tmp", appConfig.tmpDir, AccessType.ReadWrite, cacheDuration),
  fsDependencyConfig("mountVentesEnCours", appConfig.mountVec, AccessType.Read, cacheDuration),
  httpDependencyConfig("fileExporterApi", `${appConfig.fileExporterApiUrl}/healthcheck`, cacheDuration),
]
