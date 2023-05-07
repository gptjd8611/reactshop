import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

// Q?오렌지색 버튼 필요하면?-props문법 쓰면됨
let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;
//기존 스타일 복사가능
// let Newbtn = styled.button(YellowBtn)`

// `;

function Detail(props) {
  //컴포넌트에 갈고리 다는법
  //mount,update시 코드 실행해주는 useEffect
  //정확한명칭은 hook(갈고리)이다

  let [num, setNum] = useState("");
  useEffect(() => {
    // let a = setTimeout(() => {
    //   setalert(false);
    //   console.log(2);
    //   //return 안에 이게 나중에 출력됨
    // }, 2000);
    if (isNaN(num) == true) {
      alert("그러지마세요");
    }
    //useEffect동작전에 실행되는 return()=>{}
    // ex)기존 데이터요청은 제거해주세요 이런거 많이씀return안에
    return () => {
      //이거를 clearn up function 이라고 함 mount시 실행x unmount시 실행
      // console.log(1);
      // clearTimeout(a);
      // //타이머제거하는함수
    };
  }, [num]);

  // useEffect 실행조건 넣을 수 있는곳은[]
  // 디펜던씨(count)가 추가되면  mount시, 디팬던씨count라는 state가 변할때 실행됨
  //디펜던씨에 변수나 state집어넣을수 있다

  // useEffect 쓰는 이유??
  // useEffect안에 있는 코드는 html 렌더링 후에 동작함
  //그래서 어려운연산이나 서버에서 데이터 가져오는 작업
  //타이머 장착하는것
  //왜 이름이 Effect냐?side Effect보관함임 *side Effect:함수의 핵심기능과 상관없는 부가기능

  let [count, setCount] = useState(0);
  // let [alert, setalert] = useState(true);

  let { id } = useParams();
  let findid = props.shoes.find(function (x) {
    return x.id == id;
  });
  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}

      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>

      <YellowBtn bg="blue">버튼</YellowBtn>
      <YellowBtn bg="orange">버튼</YellowBtn>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
            alt=""
          />
        </div>
        {/* [현재 url에 입력한 숫자] */}
        {/* <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div> */}
        <div className="col-md-6">
          <input
            onChange={(e) => {
              setNum(e.target.value);
            }}
          />

          <h4 className="pt-5">{findid.title}</h4>
          {/* [현재 url에 입력한 숫자] */}
          <p>{findid.content}</p>
          <p>{findid.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
