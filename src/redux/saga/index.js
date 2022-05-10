import { all } from "redux-saga/effects";
import userSaga from "./user";
import transcriptionSaga from "./transcribe";
import translationSaga from "./translation";
import fastaSaga from "./fasta";
import blastSaga from "./blast";
import complementSaga from "./complement";
export default function* rootSaga() {
  yield all([
    userSaga(),
    transcriptionSaga(),
    translationSaga(),
    fastaSaga(),
    complementSaga(),
    blastSaga(),
  ]);
}
