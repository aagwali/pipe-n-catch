import { has } from "rambda"
import { defaultValue } from "../../_mocks"
import { defaultWhen, isAppError, setState, wrapWhen } from "../core"
import { formatError } from "../core/behaviors"
import { getProductViewById } from "./services"
import { PcmErrors, PcmProductView, PcmProductView_, productView } from "./types"

export const getProductView = (randomResult: number): productView<PcmProductView> =>
  setState({ productView: PcmProductView_ })(async () => {
    const result = await getProductViewById(randomResult)
      .catch(defaultWhen([isAppError(PcmErrors.Conflict), defaultValue]))
      .catch(wrapWhen([PcmErrors.NotFound], randomResult))

    if (!has("response", result)) formatError(PcmErrors.InvalidResponse, "response")

    const productView = result?.response?.data

    return { productView }
  })
