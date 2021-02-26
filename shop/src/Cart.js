import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
            {
                // redux 데이터 변경하는 방법.
                // 데이터 수정 요청은 dispatch

                props.state.map((el,i)=>{
                    return(
                        <tr key={i}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td>{el.quan}</td>
                        <td>
                          {/* dispatch 로 데이터를 보내는 방법... payload 라는 것을 추가.*/}
                            <button onClick={()=>{props.dispatch({type:"수량증가",payload:{id:el.id}})}}>+</button>
                            <button onClick={()=>{props.dispatch({type:"수량감소",payload:{id:el.id}})}}>-</button>
                        </td>
                      </tr>
                    )
                })
            }

        </tbody>
      </Table>
      {
          props.alert열렸니 === true
          ? (       <div className="my-alert">
          <p>지금 구매하시면 신규할인 20%!</p>
          <button onClick={()=>{props.dispatch({type:"alert닫기"})}}>닫기</button>
      </div>) : null
      }
    </div>
  );
}

// redux store 에서 데이터를 가져와서 props로 변환해 주는 함수
// store 데이터를 props 로 등록하기.
function state를props화(state){
    return {
        state:state.reducer,
        alert열렸니:state.reducer2
    }
}
export default connect(state를props화)(Cart)
//export default Cart;
