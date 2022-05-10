import * as type from "../types";

export function getBlastData(data) {
  return {
    type: type.GET_BLAST_REQUEST,
    payload: data,
  };
}
export function clearError() {
  return {
    type: type.CLEAR_ERROR,
  };
}
