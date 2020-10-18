import { appConfig } from "../application";

export const generateRandomUnder = (floorValue: number): number =>
  Math.floor(
    Math.random() * (floorValue - Number(appConfig.minRandom) + 1) + Number(appConfig.minRandom)
  )