import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
const apiUrl = `http:localhost:5000/transcribe`;
async function getApi(payload) {
  console.log("Yes");
  const result = await axios.post(
    "http://localhost:5000/complement",
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

function* fetchComplement(action) {
  try {
    const complement = yield getApi(action.payload);
    if (complement.hasOwnProperty("error")) {
      yield put({
        type: types.GET_COMPLEMENT_FAILED,
        message: complement.error,
      });
    } else {
      yield put({
        type: types.GET_COMPLEMENT_SUCCESS,
        complement: complement,
      });
    }
  } catch (e) {
    yield put({ type: types.GET_COMPLEMENT_FAILED, message: e.message });
  }
}

function* complementSaga() {
  yield takeEvery(types.GET_COMPLEMENT_REQUEST, fetchComplement);
}

export default complementSaga;
