import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { 재고context } from "./App.js";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./Detail.css";
// 컴포넌트 임 !
let 박스 = styled.div`
  padding: 20px;
`;
// props 문법 개능 .. 오
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

let 수량입력박스 = styled.input`
  width:50px;
  height:30px;
`
function Detail(props) {
  let history = useHistory();
  let { id } = useParams();
  let 재고 = useContext(재고context);
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState("");
  let [수량,수량변경]= useState(0);

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  // lifecycle 과 같은 hook. 컴포넌트가 mount 되었을 때 , update 되었을 때
  useEffect(() => {
    // detail 페이지 방문 후 alert 창이 2초 후에 사라지게 할 때 ?
    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    // return function 어쩌구() {}; // detail 컴포넌트가 destoy 될 때 실행
    return () => {
      clearTimeout(타이머);
    }; // 타이머 제거
  }, [alert]); // 특정 state 가 변경될 때만 실행해주세요 . 실행 조건
  // [] 만 쓰면,  update시 실행되지 않음 mount 한 번만 실행

  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });


  return (
    <div className="container">
      <박스>
        <제목 className="red">Detail</제목>
      </박스>
      {inputData}
      {/* <input
        onChange={(e) => {
          inputData변경(e.target.value);
        }}
      /> */}
      {/*input 에 무언가를 입력하면 재 렌더링(업데이트)이 발생함*/}
      {alert === true ? (
        <div className="my-alert">
          <p> 재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${찾은상품.id+1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <Info 재고={props.재고}></Info>
          <div>
            수량: <수량입력박스 type="number" onChange={(e)=>{수량변경(e.target.value)}}/>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 11, 12]);
              props.dispatch({
                type: "항목추가",
                payload: { id: 찾은상품.id, name: 찾은상품.title, quan: 수량 },
              });
              history.push('/cart');
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger ml-1"
            onClick={() => {
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              누른탭변경(0);
              스위치변경(false);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              누른탭변경(1);
              스위치변경(false);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item></Nav.Item>
      </Nav>
      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경}></TabContent>
      </CSSTransition>
    </div>
  );
}

function TabContent({ 누른탭, 스위치변경 }) {
  useEffect(() => {
    스위치변경(true);
  });
  if (누른탭 === 0) {
    return <div>0번째 내용 입니다.</div>;
  } else if (누른탭 === 1) {
    return <div>1번째 내용 입니다.</div>;
  } else if (누른탭 === 2) {
    return <div>2번째 내용 입니다.</div>;
  }
}
function Info(props) {
  return <p>재고:{props.재고[0]}</p>;
}

function state를props화(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  };
}
export default connect(state를props화)(Detail);
//export default Detail;
