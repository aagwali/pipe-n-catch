import * as Application from "./domains/application"
import { ExecutionResult, JobData } from "./domains/application/types"
import { logger } from "@df/prod-http-server"
import * as JobManagment from "./domains/bull"
import { appConfig } from "./domains/application/config"
import Bull from "bull"
import tracer from "@df/tracer"

export const handleJob = async (): Promise<void> => {
  const queue = await JobManagment.getQueue(appConfig)
  await queue.process(
    async (job: Bull.Job<JobData>, acknowledgeJob: Bull.DoneCallback): Promise<any> => {
      const { id, scopelock } = job.data
      const transaction = tracer.startTransaction(`job ${job.id} : ${scopelock}`, "job")
      logger.info(`Processing job ${job.id} : ${scopelock}`)
      try {
        Application.exitAs(ExecutionResult.ApplicationSuccess, { context: scopelock })
      } catch (jobExit) {
        await Application.handleExecutionResult(acknowledgeJob, transaction, jobExit)
      }
    },
  )
}
