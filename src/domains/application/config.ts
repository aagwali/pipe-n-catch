import { Config } from "./types"
import { guard, object, string } from "decoders"

export const appConfig: Config = {
  nodeEnv: process.env.NODE_ENV,
}

export const configGuard = object({
  nodeEnv: string,
})

export const validateConfig = (): void => {
  guard(configGuard)(appConfig)
}
