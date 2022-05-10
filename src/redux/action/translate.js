import * as type from "../types";

export function getTranslation(translation) {
  return {
    type: type.GET_TRANSLATION_REQUEST,
    payload: translation,
  };
}
export function clearError() {
  return {
    type: type.CLEAR_ERROR,
  };
}
