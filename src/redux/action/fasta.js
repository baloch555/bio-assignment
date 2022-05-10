import * as type from "../types";

export function getTranscriptionFromFasta(data) {
  return {
    type: type.GET_FASTA_REQUEST,
    payload: data,
  };
}
export function clearError() {
  return {
    type: type.CLEAR_ERROR,
  };
}
