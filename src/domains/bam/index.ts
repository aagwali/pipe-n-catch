import packageInfo from "../../../package.json"
import os from "os"
import { BamConfiguration, BamResponse, configure as setConfiguration, fireEvent } from "@df/bam-client"
import { Agent, EnvironmentHosts } from "./types"

export const configure = (bamClientEnv: string): void => {
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
  setConfiguration(bamConfig)
}

export const fireEventAllTasksCompleted = async (scopelock: string, result: any): Promise<BamResponse> =>
  fireEvent("FILE_EXPORT_COMPLETE", "OPERATION_CODE", scopelock, result)
