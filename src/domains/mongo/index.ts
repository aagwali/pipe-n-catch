import mongoose from "mongoose"
import { repositorySchema } from "./type"

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(encodeURI("appConfig.mongoDatabaseUrl"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect()
}

export const syncReportRepository = mongoose.model("sync-reports", repositorySchema)
