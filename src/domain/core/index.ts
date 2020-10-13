import { Decoder, guard } from "decoders";
import { logAs, logDebug } from "../utils/customConsole";
import { buildErrorMessage, stateError } from "./behaviors";
import { AppErrors, AppState, Config, SetStateOption } from "./types";

export const appConfig: Config = {
  confVar: process.env.CONF_VAR,
  randomFloor: process.env.RANDOM_FLOOR,
};

export let appState: AppState = {
  randomResult: null,
  productView: null,
};

export const decodeToState = async <T>(
  fun: () => Promise<T>,
  stateKey: string,
  stateKeyModel: Decoder<any, unknown>
): Promise<T> => {
  try {
    const functionResult = await fun();
    guard(stateKeyModel)(functionResult[stateKey]);
    return functionResult;
  } catch (error) {
    logDebug(`error at setState({ ${stateKey} })`);
    throw error;
  }
};

export const setState = async <T>(
  decoder: Record<string, Decoder<any, unknown>>,
  fun: () => Promise<T>,
  option?: SetStateOption
): Promise<T> => {
  try {
    const stateKey = Object.keys(decoder)[0];
    const stateKeyModel = decoder[stateKey];
    const functionResult = await decodeToState(fun, stateKey, stateKeyModel);
    if (option?.log)
      logAs("Application Info")(
        `success log emmitted : setState({ ${stateKey} })`
      );
    appState = { ...appState, ...functionResult };
    return functionResult;
  } catch (error) {
    if (option?.log)
      logAs("Application Info")("error log emmitted : {state , error} ");
    return stateError(error);
  }
};

export const defaultWhen = <T, U>([predicate, fallback]: [
  (x: T) => boolean,
  T | U
]) => (value: T): T | U => {
  if (predicate(value)) {
    return fallback;
  } else {
    if (value instanceof Error) throw value;
    return value;
  }
};

export const raiseWhen = <T>([value, predicate]: [
  T,
  (x: T) => boolean
]) => async (code: AppErrors): Promise<void> => {
  if (predicate(value)) {
    const errorMessage = buildErrorMessage(code, value);
    throw new Error(errorMessage);
  }
};

export const wrapWhen = (errorCodes: AppErrors[], raisedWith?: any) => (
  errorValue: Error
): never => {
  const registeredError = errorCodes.find(
    (errorCode) => String(errorCode) === errorValue.message
  );
  if (registeredError) {
    const errorMessage = buildErrorMessage(registeredError, raisedWith);
    throw new Error(errorMessage);
  } else {
    throw errorValue;
  }
};

export const equalError = (errorCode: AppErrors) => (error: Error): boolean =>
  error.message === String(errorCode);
