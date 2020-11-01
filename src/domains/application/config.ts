import { Config } from "./types"
import { guard, number, object, string } from "decoders"

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
