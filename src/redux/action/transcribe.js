import * as type from "../types";

export function getTranscription(transcription) {
  return {
    type: type.GET_TRANSCRIPTION_REQUEST,
    payload: transcription,
  };
}

export function clearError() {
  return {
    type: type.CLEAR_ERROR,
  };
}
