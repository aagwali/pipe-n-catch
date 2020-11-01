import { ExecutionResult, JobData } from "./domains/application/types"
import Bull from "bull"
import * as Application from "./domains/application"
import { logger } from "@df/prod-http-server"
import { jobConfig, setjobConfig } from "./domains/application/config"

export const handleJob = async (queue: Bull.Queue<any>): Promise<void> => {
  await queue.process(
    async (job: Bull.Job<JobData>, acknowledgeJob: Bull.DoneCallback): Promise<any> => {
      setjobConfig(`job_${job.id}_${job.data.scopelock}`)
      try {
        const { id, scopelock } = job.data
        jobConfig.logInfo(`Processing job ${job.id} : ${scopelock}`)

        Application.exitAs(ExecutionResult.ApplicationSuccess, { context: scopelock })
      } catch (jobExit) {
        await Application.handleExecutionResult(acknowledgeJob, jobExit)
      }
    },
  )
}
