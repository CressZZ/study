# https://github.com/reactkr/learn-react-in-korean/blob/master/translated/deal-with-async-process-by-redux-saga.md

```js
/**
 * redux-saga
 */
 // saga.js => 결국에는 reduce 임
function* handleRequestSearchByLocation() {
  while (true) {
    const action = yield take(SUCCESS_USER);
    const { payload, error } = yield call(
      API.searchByLocation,
      action.payload.location
    );
    if (payload && !error) {
      yield put(successSearchByLocation(payload));
    } else {
      yield put(failureSearchByLocation(error));
    }
  }
}

// 변경없음!
function* handleRequestUser() {
  while (true) {
    const action = yield take(REQUEST_USER);
    const { payload, error } = yield call(API.user, action.payload);
    if (payload && !error) {
      yield put(successUser(payload));
    } else {
      yield put(failureUser(error));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUser);
  yield fork(handleRequestSearchByLocation); // 추가
}

/**
 * redux-thunk (1)
 */
 // action.js
export async function fetchUser(id) {
  return (dispatch) => {
    // 유저 정보를 읽어들인다
    dispatch(requestUser(id));

    const { payload, error } = await API.user(id);

    if (payload && !error) {
      dispatch(successUser(payload));

      // 체인: 지역명으로 유저를 검색
      dispatch(requestSearchByLocation(id));

      const { payload, error } = await API.searchByLocation(id);

      if (payload && !error) {
        dispatch(successSearchByLocation(payload));
      } else {
        dispatch(failureSearchByLocation(error));
      }
    } else {
      dispatch(failureUser(error));
    }
  };
}

/**
 * redux-thunk (2)
 */

// action.js
// 액션 크리에이터가 많아짐 

export async function fetchUser(id) {
  return (dispatch) => {
    // 유저 정보를 읽어들인다
    dispatch(requestUser(id));

    const { payload, error } = await API.user(id);

    if (payload && !error) {
      dispatch(successUserUi(payload)); // ui 변경 액션

      dispatch(successUserCallback(payload)); // 비동기 액션
    } else {
      dispatch(failureUser(error));
    }
  };
}


async function successUserCallback(payload) {
  return (dispatch) => {
    // 체인: 지역명으로 유저를 검색
    dispatch(requestSearchByLocation(id));

    const { payload, error } = await API.searchByLocation(id);

    if (payload && !error) {
      dispatch(successSearchByLocation(payload));
    } else {
      dispatch(failureSearchByLocation(error));
    }
  };
}
```
