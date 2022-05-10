import * as type from "../types";
const initialState = {
  complement: "",
  loading: false,
  error: null,
};

export default function complementReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_COMPLEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.GET_COMPLEMENT_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        complement: action.complement,
      };
    case type.GET_COMPLEMENT_FAILED:
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
