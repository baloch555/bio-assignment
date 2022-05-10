import * as type from "../types";
const initialState = {
  transcription: "",
  translation: "",
  complement: "",
  loading: false,
  error: null,
};

export default function fastaReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_FASTA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.GET_FASTA_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        complement: action.transcription.complement,
        transcription: action.transcription.transcription,
        translation: action.transcription.translation,
      };
    case type.GET_FASTA_FAILED:
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
