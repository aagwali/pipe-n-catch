import packageInfo from "../../../package.json"
import os from "os"
import { BamConfiguration, BamResponse, configure, fireEvent } from "@df/bam-client"
import { Config } from "../application/types"
import { Agent, EnvironmentHosts } from "./types"

// todo check is async ?
export const configureClient = (bamClientEnv: string): void => {
  const bamConfig: BamConfiguration = {
    environment: bamClientEnv as EnvironmentHosts,
    instrument: {
      name: packageInfo.name,
      host: os.hostname(),
      version: packageInfo.version,
    },
    agent: { type: "service" as Agent, id: packageInfo.name },
    domain: "media",
  }
  configure(bamConfig)
}

export const fireEventAllTasksCompleted = async (scopelock: string, result: any): Promise<BamResponse> =>
  fireEvent("FILE_EXPORT_COMPLETE", "OPERATION_CODE", scopelock, result)
