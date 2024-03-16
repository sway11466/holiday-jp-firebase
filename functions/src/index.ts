/**
 * settings
 */
import {setGlobalOptions} from "firebase-functions/v2";
setGlobalOptions({
  region: "asia-northeast1",
});

/**
 * def functions
 */
export {holiday} from "./holiday";
export {weekend} from "./weekend";
export {weekday} from "./weekday";
