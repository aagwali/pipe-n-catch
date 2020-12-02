import { IRestResponse, RestClient } from "typed-rest-client"

import { appConfig } from "../application/config"
import { FileExporterTask } from "./types"

export const fileExporterApiClient = new RestClient("fileExporterApi", appConfig.fileExporterApiUrl)

export const getTasksByScopelock = (scopelock: string): Promise<IRestResponse<FileExporterTask[]>> =>
  fileExporterApiClient.get<FileExporterTask[]>(`api/batches/${scopelock}/tasks`)
