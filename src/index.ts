import { buildCorrelationId, logInfo, setjobConfig } from "./domains/application/config"
import { handleExceptions, setSuccess } from "./domains/application/exit"
import { AppDoneCallback, AppJob, AppQueue, JobData } from "./domains/application/types"

export const handleJob = async (queue: AppQueue): Promise<void> =>
  queue
    .process(
      async (job: AppJob<JobData>, acknowledgeJob: AppDoneCallback): Promise<any> => {
        try {
          setjobConfig(buildCorrelationId(job), queue)

          logInfo(`Processing job ${job.id} : ${job.data.scopelock}`)

          setSuccess(acknowledgeJob)
        } catch (exception) {
          handleExceptions(exception, acknowledgeJob)
        }
      },
    )
    .finally(() => queue.close())
