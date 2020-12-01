import Bull from "bull"

import { asRedisOptions } from "@df/redis-config-validator"

import { Config } from "../application/types"

export const createDebugMessage = (jobFrequency: number, queue: Bull.Queue<any>): Promise<Bull.Job<any>> =>
  queue.add(
    { scopelock: "debug message" },
    {
      repeat: {
        every: jobFrequency,
      },
    },
  )

export const getQueue = async (config: Config): Promise<Bull.Queue<any>> => {
  const queue = Bull(config.bullQueuName, {
    redis: asRedisOptions(JSON.parse(config.bullRedisUrl)),
    settings: {
      lockDuration: config.jobLockDuration,
      lockRenewTime: config.jobLockRenewTime,
    },
  })
  await queue.isReady()

  createDebugMessage(20000, queue)
  return queue
}
