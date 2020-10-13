import { number } from "decoders"
import { equals } from "rambda"
import { defaultWhen, raiseWhen, setState } from "../core"
import { LogTypes } from "../core/types"
import { generateRandom } from "./behaviors"
import { randomResult, UtilsErrors } from "./types"

// 0 : works fine
// 1 : guard
// 2 : NotFound > Wrapped
// 3 : Conflict > Default

export const getRandomNumber = (floor: string): randomResult<number> =>
  setState({ randomResult: number }, async () => {
    const randomResult = defaultWhen([equals(0), 3])(
      generateRandom(Number(floor))
    )
    await raiseWhen([randomResult, equals(1)])(UtilsErrors.BadRandomResult)

    return { randomResult }
  }, {log: LogTypes.Fluent})
