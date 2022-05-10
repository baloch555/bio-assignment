import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";
async function getApi(payload) {
  const result = await axios.post(
    "http://localhost:5000/translate",
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

function* fetchTranslation(action) {
  try {
    const data = yield getApi(action.payload);
    if (data.hasOwnProperty("error")) {
      yield put({ type: types.GET_TRANSLATION_FAILED, message: data.error });
    } else {
      yield put({
        type: types.GET_TRANSLATION_SUCCESS,
        data,
      });
    }
  } catch (e) {
    yield put({ type: types.GET_TRANSLATION_FAILED, message: e.message });
  }
}

function* translationSaga() {
  yield takeEvery(types.GET_TRANSLATION_REQUEST, fetchTranslation);
}

export default translationSaga;
