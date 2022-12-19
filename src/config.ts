import Joi from "joi"

const { number, object, string } = Joi.types()

export type Config = {
  environment: string
}

export const appConfig: Config = {
  environment: process.env.ENVIRONMENT,
}

const configGuard = object
  .keys({
    environment: string.valid("dev", "ci", "pp", "production").required().label("ENVIRONMENT"),
  })
  .unknown(true)

export const validateConfig = (): Promise<void> =>
  configGuard.validateAsync(appConfig).catch((err) => {
    throw Error(err.message)
  })
