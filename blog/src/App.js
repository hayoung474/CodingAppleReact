/* eslint-disable*/

import logo from './logo.svg';

import React , {useState} from 'react'
import './App.css';

// for문 사용 도 가능하지만.. 잘 안쓸껄?
// 함수를 하나 만들고 for문을 사용해서 HTML 생성기를 만든다고 생각하면 됨.

// 부모 컴포넌트
function App() {
  let posts="구미 고기 맛집"; // 서버에서 가져온 데이터라고 가정


  let [글제목,글제목변경] = useState(['홍대 피자 맛집','구미 떡볶이 맛집','대구 막창 맛집']);
  let [따봉,따봉변경]=useState(0);
  let [modal,modal변경] = useState(false);
  let [누른제목넘버,누른제목넘버변경]= useState(0);
  let [입력값, 입력값변경]=useState('');


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

  function 글발행(){
    var newArray = [...글제목]
    newArray.unshift(입력값)
    글제목변경(newArray)
  }
  return (
    <div className="App">
      <div className="black-nav ">
        <div>개발 Blog 👩</div>
      </div>
      {/* <button onClick={제목바꾸기}>글제목변경</button>
      <button onClick={제목정렬}>글제목정렬</button> */}

      
      {/* <div className="list">
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
      </div> */}
      {
        // for 반복문이 불가함 ㅠ
        // map 사용
        // map()
        // index 는 리스트에서 요소의 index 를 가져옴.
        글제목.map(function(글, index){
          return   ( // key 를 넣어주긴 해야함....
            <div className="list" key={index}>
              <h3 onClick={()=>{누른제목넘버변경(index);}}>{글}<span onClick={()=>{따봉변경(따봉+1)}}>👍</span>{따봉}</h3>
              <p>2021년 1월 3일 발행</p>
              <hr/>
            </div>
          )
        })
      }
      <div class="publish">
        <input onChange={(e)=>{입력값변경(e.target.value)}}></input>
        <button onClick={글발행}>저장</button>
      </div>
      {/* <input onChange={(e)=>{입력값변경(e.target.value)}}></input>
      {입력값} */}
      <button onClick={()=>{modal변경(!modal)}}>모달창 여/닫기</button>
      
      {
        // if 는 쓸 수 없어 ... 그래서 삼항연산자를 사용함
        modal === true
        ? <Modal 글제목={글제목} 누른제목넘버={누른제목넘버}></Modal> 
        : null // 텅 빈 HTML
      }
      <Profile/>
    </div>
  );
}

// 자식 컴포넌트
function Modal(props){
  return(
    <div className="modal">
      <h2>제목 : {props.글제목[props.누른제목넘버]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
// 상속? 
// 옛날 옛적 문법은 this. 를 항상 붙여줘야 ..... 뷰 랑 비슷하노
class Profile extends React.Component{
  constructor(){
    super(); // 생성자?
    this.state = {name:"전하영" , age:"23"}
  }
  changeName(){
    this.setState({name:'park'})
  }
  render(){
    return(
      <> {/*프래그먼트 문법 */}
        <h3>프로필 입니다</h3>
        <p>저는 {this.state.name} 입니다</p>
        <p>나이는 {this.state.age}살 입니다.</p>
        <button onClick={this.changeName.bind(this)}>이름바꾸기</button>
      </>
    )
  }
}
export default App;
