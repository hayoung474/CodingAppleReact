import logo from './logo.svg';
import './App.css';
import Detail from './Detail'

import {Navbar ,Nav,NavDropdown,Jumbotron,Button} from 'react-bootstrap'

import React,{useState} from 'react'
import Data from './data'

import {Link,Route,Switch} from 'react-router-dom'

function App() {
  let [shoes,shoes변경]= useState(Data);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="">
        <Navbar.Brand href="/">Shoe Shop 🥾</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link ><Link to="/">Home</Link></Nav.Link>
            <Nav.Link ><Link to="/detail">Detail</Link></Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% F/W Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
              {shoes.map(function(shoe,index){
                return(
                  <Card shoe={shoes[index]} i={index} key={index}/>
                )
              })}
            </div>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes}></Detail> {/* 다른 파일로 뺀 컴포넌트. Detail.js*/}
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을 때</div>
        </Route>
      </Switch>
      


      
    </div>
  );
}
function Card(props){
  return(
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`} width="100%"/>
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content} , {props.shoe.price}</p>

    </div>
  )
}

export default App;
