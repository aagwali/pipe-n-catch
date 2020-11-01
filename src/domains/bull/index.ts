import Bull from "bull"
import { asRedisOptions } from "@df/redis-config-validator"
import { Config } from "../application/types"

let queue = null
export const getQueue = async (config: Config): Promise<Bull.Queue<any>> => {
  if (!queue) {
    queue = Bull(config.bullQueuName, {
      redis: asRedisOptions(JSON.parse(config.bullRedisUrl)),
      settings: {
        lockDuration: config.jobLockDuration,
        lockRenewTime: config.jobLockRenewTime,
      },
    })
    await queue.isReady()
  }
  return queue
}
