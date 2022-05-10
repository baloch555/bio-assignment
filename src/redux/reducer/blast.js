import * as type from "../types";
const initialState = {
  result: [],
  alignments: [],
  translation: "",
  complement: "",
  loading: false,
  error: null,
};

export default function blastReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_BLAST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.GET_BLAST_SUCCESS:
      console.log("Action ", action);
      return {
        ...state,
        loading: false,
        result: action.blast.result,
        alignments: action.blast.aligmnets,
      };
    case type.GET_BLAST_FAILED:
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
