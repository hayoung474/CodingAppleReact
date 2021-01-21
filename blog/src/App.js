/* eslint-disable*/

import logo from './logo.svg';

import React , {useState} from 'react'
import './App.css';

function Modal(){
  return(
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
function App() {
  let posts="구미 고기 맛집"; // 서버에서 가져온 데이터라고 가정
  let [글제목,글제목변경] = useState(['홍대 피자 맛집','구미 떡볶이 맛집','대구 막창 맛집']);
  let [따봉,따봉변경]=useState(0)
  let [modal,modal변경] = useState(false);
  
  function 제목바꾸기(){
    var newArray = [...글제목] // deep copy
    newArray[0]='구미 백반 맛집'
    글제목변경(newArray);
  }
  function 제목정렬(){
    var newArray = [...글제목] // deep copy
    newArray.sort()
    글제목변경(newArray);
  }
  return (
    <div className="App">
      <div className="black-nav ">
        <div>개발 Blog 👩</div>
      </div>
      <button onClick={제목바꾸기}>글제목변경</button>
      <button onClick={제목정렬}>글제목정렬</button>

      
      <div className="list">
        <h3>{글제목[0]}<span onClick={()=>{따봉변경(따봉+1)}}>👍</span>{따봉}</h3>
        <p>2021년 1월 2일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{글제목[1]}</h3>
        <p>2021년 1월 3일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3 >{글제목[2]}</h3>
        <p>2021년 1월 5일 발행</p>
        <hr/>
      </div>
      {
        // for 반복문이 불가함 ㅠ
        // map 사용
        // map()

        글제목.map(function(a){
          return <div>{a}</div>
        })
      }
      <button onClick={()=>{modal변경(!modal)}}>모달창 여/닫기</button>
      
      {
        // if 는 쓸 수 없어 ... 그래서 삼항연산자를 사용함
        modal === true
        ? <Modal></Modal>
        : null // 텅 빈 HTML
      }
    </div>
  );
}

export default App;
