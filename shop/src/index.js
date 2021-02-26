import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

// redux 를 쓰는 이유 ?
// 1. 복잡한 props 전송이 필요 없다.
// 2. 모든 컴포넌트가 직접 데이터를 꺼내 쓸 수 있다.
// 3. state 데이터 관리 가능 => 수정하는 방법을 정의해야 함. 수정함수?
// 조그만 사이트에서는 redux는 사용할 필요가 없으나, 대형 사이트에서는 redux 사용 하기편함.
// 대규모 사이트는 state가 100만개 있고 1000만 곳에서 state를 수정한다 ... 라고 가정했을 때 갑자기 한 곳에서 state가 이상해지면
// 다른 컴포넌트를 모두 뒤져야한다. 이런 문제를 해결하기 위해서 ..! 많은 데이터 관리 용이
// 다른 파일로 빼기 가능

// 이런 경우에는 굳이 redux 를 사용할 필요가 없어.. 하나의 컴포넌트에 국한되는거는 그냥 useState 쓰는게 낫다.
// 아래같은 alert state 는 잘못된 코딩 관습!
let alert초기값 = true;

// reducer 가 state 를 변경하게 해주는 ... 그런 함수라고 생각하면 된다!
// 어렵네 허허 
function reducer2(state = alert초기값, 액션) {
  if (액션.type === "alert닫기") {
    state = false;
    return state;
  } else {
    return state;
  }
}

let 초기값 = [
  { id: 0, name: "멋진신발", quan: 2 },
  { id: 1, name: "멋진구두", quan: 1 },
];

// store 데이터를 수정하는 방법. reducer 함수 정의.

//                함수 기본값 설정 구문
function reducer(state = 초기값, 액션) {
  if (액션.type === "항목추가"){
    let copy = [...state]

    const index = copy.findIndex(e => e.id === 액션.payload.id)
    console.log(index);
    
    if(index >= 0){
      let sum = parseInt(copy[index].quan) + parseInt(액션.payload.quan)
      copy[index].quan = sum;
    }
    else{
      copy.push(액션.payload);
    }
    return copy;
  }
  else if (액션.type === "수량증가") {
    // 수량 증가라는 데이터 수정방법을 정의한 것
    // payload 는 dispatch 호출 시 함께 넘어온 데이터
    // 액션.payload
    let copy = [...state]; // deepcopy
    copy[액션.payload.id].quan++;
    return copy; // 수정된 state
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    copy[액션.payload.id].quan--;
    return copy;
  } else {
    return state;
  }
}

// state 보관통, 여러개 보관을 하려면
// reducer 를 합치려면 combineReducers{} 사용하면 된다.
let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
