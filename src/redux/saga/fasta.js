import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
const apiUrl = `http:localhost:5000/transcribe`;
async function getApi(payload) {
  const result = await axios.post(
    "http://localhost:5000/fasta",
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

function* fetchFastaResult(action) {
  try {
    const transcription = yield getApi(action.payload);
    console.log("trs =>", transcription);
    if (transcription.hasOwnProperty("error")) {
      yield put({ type: types.GET_FASTA_FAILED, message: transcription.error });
    }
    yield put({
      type: types.GET_FASTA_SUCCESS,
      transcription,
    });
  } catch (e) {
    yield put({ type: types.GET_FASTA_FAILED, message: e.message });
  }
}

function* fastaSaga() {
  yield takeEvery(types.GET_FASTA_REQUEST, fetchFastaResult);
}

export default fastaSaga;
