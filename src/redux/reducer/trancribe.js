import * as type from "../types";
const initialState = {
  transcription: "",
  loading: false,
  error: null,
};

export default function transcriptionReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_TRANSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.GET_TRANSCRIPTION_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        transcription: action.transcription,
      };
    case type.GET_TRANSCRIPTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
