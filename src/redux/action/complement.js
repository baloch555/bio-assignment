import * as type from "../types";

export function getComplement(complement) {
  return {
    type: type.GET_COMPLEMENT_REQUEST,
    payload: complement,
  };
}

export function clearError() {
  return {
    type: type.CLEAR_ERROR,
  };
}
