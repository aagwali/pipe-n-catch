import * as Application from "./domains/application"
import { buildCorrelationId, jobConfig, setjobConfig } from "./domains/application/config"
import { AppDoneCallback, AppJob, AppQueue, ExecutionResult, JobData } from "./domains/application/types"

export const handleJob = async (queue: AppQueue): Promise<void> => {
  await queue.process(
    async (job: AppJob<JobData>, acknowledgeJob: AppDoneCallback): Promise<any> => {
      setjobConfig(buildCorrelationId(job))
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
