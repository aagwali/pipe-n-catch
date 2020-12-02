import * as Application from "./domains/application"
import { buildCorrelationId, logError, logInfo, setjobConfig } from "./domains/application/config"
import { handleExceptions, setSuccess } from "./domains/application/exit"
import { AppDoneCallback, AppJob, AppQueue, JobData } from "./domains/application/types"
import * as FileExporterApi from "./domains/fileExporter"

export const handleJob = async (queue: AppQueue): Promise<void> =>
  queue
    .process(
      async (job: AppJob<JobData>, acknowledgeJob: AppDoneCallback): Promise<any> => {
        try {
          setjobConfig(buildCorrelationId(job), queue)

          const { scopelock } = job.data

          logInfo(`Processing job ${job.id} : ${scopelock}`)

          const allTasks = await FileExporterApi.getTasksFromBatch(scopelock)

          const allTasksUpdated = await Application.processToFileCopy(allTasks)

          await FileExporterApi.updateBatchTasks(allTasksUpdated)

          await Application.checkProcessResult(allTasksUpdated)

          setSuccess(acknowledgeJob)
        } catch (exception) {
          handleExceptions(exception, acknowledgeJob)
        }
      },
    )
    .catch((e) => logError(e, "uneeee"))
// .finally(() => queue.close())
