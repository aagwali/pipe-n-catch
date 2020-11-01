import { guard, number, object, string } from "decoders"

import { logger } from "@df/prod-http-server"
import tracer from "@df/tracer"

import { AppExit, AppJob, Config, JobData } from "./types"

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
  tmpDir: process.env.TMP_DIR,
  mountVec: process.env.MOUNT_VEC,
  bamClientEnv: process.env.BAM_CLIENT_ENVIRONMENT,
  damClientEnv: process.env.DAM_CLIENT_ENVIRONMENT,
  damApiKey: process.env.DAM_API_KEY,
  fileExporterApiUrl: process.env.WORKFLOW_API_URL,
}

export const configGuard = object({
  nodeEnv: string,
  bullRedisUrl: string,
  bullQueuName: string,
  healthchecksCacheDurationSeconds: number,
  elasticApmServerUrl: string,
  environment: string,
  fluentHost: string,
  fluentPort: string,
  fluentTag: string,
  jobLockDuration: number,
  jobLockRenewTime: number,
  tmpDir: string,
  mountVec: string,
  bamClientEnv: string,
  damClientEnv: string,
  damApiKey: string,
  fileExporterApiUrl: string,
})

export const validateConfig = (): void => {
  guard(configGuard)(appConfig)
}

export const jobConfig = {
  logInfo: (message: string): void => logger.info(message),
  logWarning: (message: string): void => logger.warning(message),
  logError: (message: string, error?: AppExit | Error): void => logger.error({ error }, message),
  apmTransaction: {
    end: () => logger.warning("apm transaction is not started"),
    result: null,
  },
}

export const buildCorrelationId = (job: AppJob<JobData>): string => `job_${job.id}_${job.data.scopelock}`

export const setjobConfig = (correlationId: string) => {
  jobConfig.logInfo = (message: string): void => logger.info({ correlationId }, message)
  jobConfig.logWarning = (message: string): void => logger.warning({ correlationId }, message)
  jobConfig.logError = (message: string, error?: AppExit | Error): void =>
    logger.error({ error, correlationId }, message)
  jobConfig.apmTransaction = tracer.startTransaction(correlationId, "job")
}
