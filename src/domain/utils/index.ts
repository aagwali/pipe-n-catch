import { defaultWhen, raiseWhen, setState } from "../core"
import { equals } from "rambda"
import { generateRandom } from "./behaviors"
import { LogTypes } from "../core/types"
import { number } from "decoders"
import { RandomResult, UtilsErrors } from "./types"

/* Legend defaultValue :
   0 : works fine
   1 : guard
   2 : NotFound > Wrapped
   3 : Conflict > Default */

export const getRandomNumber = (floor: string): RandomResult<number> =>
  setState(
    { randomResult: number },
    { log: LogTypes.Fluent }
  )(async () => {
    const randomResult = defaultWhen(equals(0), 3)(generateRandom(Number(floor)))
    await raiseWhen(randomResult, equals(1))(UtilsErrors.BadRandomResult)

    return { randomResult }
  })
