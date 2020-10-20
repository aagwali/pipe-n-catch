import { setState } from "../state"
import { doSomeStuffs } from "./behaviors"
import { StateKeyGeneric, GenericResult, genericResult } from "./types"

export const generate = (someValue: any): StateKeyGeneric<GenericResult> =>
  setState({ generic: genericResult })(async () => {

    const generic = doSomeStuffs(someValue)

    return { generic }
  })
