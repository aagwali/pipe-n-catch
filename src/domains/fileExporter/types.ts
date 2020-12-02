export enum TaskStatus {
  Created = "created",
  Failed = "failed",
  Ended = "ended",
}

export type FileExporterTask = {
  status: TaskStatus
  sourceURI: string
  destinationURI: string
}

export type FileExporterBatch = {
  scopelock: string
  tasks: FileExporterTask[]
}
