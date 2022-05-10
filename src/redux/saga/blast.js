import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
const apiUrl = `http:localhost:5000/transcribe`;
async function getApi(payload) {
  console.log("In API CALL => ", payload);
  const result = await axios.post(
    "http://localhost:5000/blast",
    {
      body: payload.payload,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Result => ", result);
  return result.data;
}

function* fetchBlastResult(action) {
  try {
    const blast = yield call(getApi, action);
    console.log("BLAST => ", blast);
    if (blast.hasOwnProperty("error")) {
      yield put({ type: types.GET_BLAST_FAILED, message: blast.error });
    }
    yield put({
      type: types.GET_BLAST_SUCCESS,
      blast,
    });
  } catch (e) {
    yield put({ type: types.GET_BLAST_FAILED, message: e.message });
  }
}

function* blastSaga() {
  yield takeEvery(types.GET_BLAST_REQUEST, fetchBlastResult);
}

export default blastSaga;
