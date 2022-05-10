import * as type from "../types";
const initialState = {
  transcription: "",
  translation: "",
  loading: false,
  error: null,
};

export default function translationReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_TRANSLATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.GET_TRANSLATION_SUCCESS:
      return {
        ...state,
        loading: false,
        translation: action.data.translation,
        transcription: action.data.transcription,
      };
    case type.GET_TRANSLATION_FAILED:
      console.log(action);
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
