import { number } from "decoders"
import { equals } from "rambda"
import { defaultWhen, raiseWhen, setState } from "../core"
import { LogTypes } from "../core/types"
import { generateRandom } from "./behaviors"
import { randomResult, UtilsErrors } from "./types"

/* Legend default :
   0 : works fine
   1 : guard
   2 : NotFound > Wrapped
   3 : Conflict > Default */

export const getRandomNumber = (floor: string): randomResult<number> =>
  setState(
    { randomResult: number },
    { log: LogTypes.Fluent }
  )(async () => {
    const randomResult = defaultWhen([equals(0), 3])(generateRandom(Number(floor)))
    await raiseWhen([randomResult, equals(1)])(UtilsErrors.BadRandomResult)

    return { randomResult }
  })
