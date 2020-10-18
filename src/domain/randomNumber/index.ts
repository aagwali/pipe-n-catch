import { defaultWhenValue, raiseErrorWhen, setState } from "../state"
import { equals } from "rambda"
import { generateRandomUnder } from "./behaviors"
import { number } from "decoders"
import { StateKeyRandomResult, RandomNumberErrors } from "./types"

export const generate = (floor: string): StateKeyRandomResult<number> =>
  setState({ randomResult: number })(async () => {
    const randomResult = defaultWhenValue(equals(7), 13)(generateRandomUnder(Number(floor)))
    await raiseErrorWhen(randomResult, equals(9))(RandomNumberErrors.ExcludedRandomResult)

    return { randomResult }
  })
