import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
const apiUrl = `http:localhost:5000/transcribe`;
async function getApi(payload) {
  const result = await axios.post(
    "http://localhost:5000/transcribe",
    {
      body: payload,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.data;
}

function* fetchTranscription(action) {
  try {
    const transcription = yield getApi(action.payload);
    if (transcription.hasOwnProperty("error")) {
      yield put({
        type: types.GET_TRANSCRIPTION_FAILED,
        message: transcription.error,
      });
    } else {
      yield put({
        type: types.GET_TRANSCRIPTION_SUCCESS,
        transcription: transcription,
      });
    }
  } catch (e) {
    yield put({ type: types.GET_TRANSCRIPTION_FAILED, message: e.message });
  }
}

function* transcriptionSaga() {
  yield takeEvery(types.GET_TRANSCRIPTION_REQUEST, fetchTranscription);
}

export default transcriptionSaga;
