import { combineReducers } from "redux";
import users from "./users";
import transcriptionReducer from "./trancribe";
import translationReducer from "./translation";
import fastaReducer from "./fasta";
import blastReducer from "./blast";
import complementReducer from "./complement";
const rootReducer = combineReducers({
  users: users,
  transcriptionReducer,
  translationReducer,
  fastaReducer,
  complementReducer,
  blastReducer,
});

export default rootReducer;
