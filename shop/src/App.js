import logo from "./logo.svg";
import "./App.css";
import Detail from "./Detail";
import axios from "axios";

import { Navbar, Nav, NavDropdown, Jumbotron, Button } from "react-bootstrap";

import React, { useContext, useState } from "react";
import Data from "./data";

import { Link, Route, Switch } from "react-router-dom";
import { useEffect } from "react";

//context 문법. 자식이 부모의 변수 값을 공유함

export let 재고context = React.createContext(); // 범위생성

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="">
        <Navbar.Brand href="/">Shoe Shop 🥾</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              Detail
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% F/W Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">
            {/* provider 로 감싸기 value 안에는 공유하고 싶은 값.*/}
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map(function (shoe, index) {
                  return <Card shoe={shoes[index]} i={index} key={index} />;
                })}
              </div>
            </재고context.Provider>
            <button
              className="btn btn-primary"
              onClick={() => {
                // 로딩중이라는  UI를 띄움
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((res) => {
                    // 로딩중이라는 UI 를 안보이게 처리
                    shoes변경([...shoes, ...res.data]);
                  })
                  .catch(() => {
                    console.log("실패했어요");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        {/* 다른 파일에 context를 이용하여 재고 변수를 공유하고 싶을 때 */}
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}></Detail>{" "}
            {/* 다른 파일로 뺀 컴포넌트. Detail.js*/}
          </재고context.Provider>
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을 때</div>
        </Route>
      </Switch>
      {/* <button ><a href="http://www.naver.com">네이버</a></button> */}
    </div>
  );
}

// 간단한 데이터 전송은 porps 를 쓰고, 컴포넌트 부모-자식 이 깊어지면 context를 활용하자.

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width="100%"
      />
      <h4>{props.shoe.title}</h4>
      <p>
        {props.shoe.content} , {props.shoe.price}
      </p>
      <Test></Test>
    </div>
  );
}

function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고}</p>;
}
export default App;
