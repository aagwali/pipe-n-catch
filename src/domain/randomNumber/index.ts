import { defaultWhen, raiseWhen, setState } from "../core"
import { equals } from "rambda"
import { generateRandomUnder } from "./behaviors"
import { LogTypes } from "../core/types"
import { number } from "decoders"
import { RandomResult, UtilsErrors } from "./types"

/* Legend defaultShip :
   0 : works fine
   1 : guard
   2 : NotFound > Wrapped
   3 : Conflict > Default */

export const getRandomNumber = (floor: string): RandomResult<number> =>
  setState(
    { randomResult: number },
    { log: LogTypes.Fluent }
  )(async () => {
    const randomResult = defaultWhen(equals(7), 13)(generateRandomUnder(Number(floor)))
    await raiseWhen(randomResult, equals(9))(UtilsErrors.ExcludedRandomResult)

    return { randomResult }
  })
