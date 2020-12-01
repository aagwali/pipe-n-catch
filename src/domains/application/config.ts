import { logger } from "@df/prod-http-server"
import tracer from "@df/tracer"
import { number, object, string } from "@hapi/joi"

import { AppJob, AppQueue, Config, JobData } from "./types"

export const appConfig: Config = {
  nodeEnv: process.env.NODE_ENV,
  bullRedisUrl: process.env.BULL_REDIS_URL,
  bullQueuName: process.env.BULL_QUEUE_NAME,
  healthchecksCacheDurationSeconds: Number(process.env.HEALTHCHECKS_CACHE_DURATION_SECONDS),
  elasticApmServerUrl: process.env.ELASTIC_APM_SERVER_URL,
  environment: process.env.ENVIRONMENT,
  fluentHost: process.env.FLUENTD_HOST,
  fluentPort: process.env.FLUENTD_PORT,
  fluentTag: process.env.FLUENTD_TAG,
  jobLockDuration: Number(process.env.JOB_LOCK_DURATION),
  jobLockRenewTime: Number(process.env.JOB_LOCK_RENEWTIME),
  mountVec: process.env.MOUNT_VEC,
  bamClientEnv: process.env.BAM_CLIENT_ENVIRONMENT,
  damClientEnv: process.env.DAM_CLIENT_ENVIRONMENT,
  damApiKey: process.env.DAM_API_KEY,
  fileExporterApiUrl: process.env.WORKFLOW_API_URL,
}

export const configGuard = object({
  nodeEnv: string().required(),
  bullRedisUrl: string().required(),
  bullQueuName: string().required(),
  healthchecksCacheDurationSeconds: number().required(),
  elasticApmServerUrl: string().required(),
  environment: string().required(),
  fluentHost: string().required(),
  fluentPort: string().required(),
  fluentTag: string().required(),
  jobLockDuration: number().required(),
  jobLockRenewTime: number().required(),
  mountVec: string().required(),
  bamClientEnv: string().required(),
  damClientEnv: string().required(),
  damApiKey: string().required(),
  fileExporterApiUrl: string().required(),
})

export const validateConfig = (): Promise<void> => configGuard.validateAsync(appConfig)

export const buildCorrelationId = (job: AppJob<JobData>): string => `job_${job.id}_${job.data.scopelock}`

export let apmTransaction = {
  end: () => logger.warning("apm transaction is not started"),
  result: null,
}

let childLogger = logger
export const logInfo = (s: any): void => childLogger.info(s)
export const logError = (err: Error, s: any): void => childLogger.error({ err }, s)
export const logWarning = (s: any): void => childLogger.warning(s)

export const setjobConfig = (req_id: string, onAcknowledgedmentQueue: AppQueue): void => {
  apmTransaction = tracer.startTransaction(req_id, "job")
  childLogger = logger.instance.child({ req_id })
}
