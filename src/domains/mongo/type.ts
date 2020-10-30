import { Schema } from "mongoose"

export const repositorySchema: Schema = new Schema({ someKey: { type: String } }, { timestamps: true })
