import { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //페이지 이동 도와줌\

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="row">
                {shoes.map(function (a, i) {
                  return <List shoes={shoes[i]} b={i}></List>;
                })}
              </div>
              {/* 응용1.버튼2번누르면 상품789가져오기 data3에서 가져옴 팁:버튼누른횟수기록
              응용2. 버튼3회누르면 상품 더 없다고 알려주기 
              응용3 버튼누르면 로딩중입니다 글자띄우기
              */}
              <butotn
                onClick={() => {
                  // 로딩중 ui띄우기
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((result) => {
                      let dataCopy = [...shoes, ...result.data];
                      //이 result.data도 실은 JSON파일로 받아옴 근데 axios가 array로자동으로 바꿔줌
                      setShoes(dataCopy);
                      // 로딩중ui 숨기기
                    })
                    .catch(() => {
                      console.log("실패함 ㅅㄱ");
                      // 로딩중ui 숨기기
                    });

                  //그냥 js기본문법으로도 GET요청 가능
                  // fetch('https://codingapple1.github.io/shop/data2.json')
                  // .then(result => result.json()) json>array,object로 변환해주는 코드
                  // .then(data =>{})
                }}
              >
                서버요청버튼
              </butotn>
            </>
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={
            <div>
              <Detail shoes={shoes} />
            </div>
          }
        ></Route>
        <Route path="*" element={<div>없는페이지임</div>}></Route>
        {/* *은 404페이지 이사하네이지로 접속햇을때 많이씀 */}
        {/* <Route
          path="/about"
          element={
            <div>
              <About />
            </div>
          }
        ></Route>
        <Route
          path="/about/member"
          element={
            <div>
              <About />
            </div>
          }
        ></Route>
        <Route
          path="/about/location"
          element={
            <div>
              <About />
            </div>
          }
        ></Route> */}
        {/* 위에거랑똑같다 
        route안에 route넣는것을 nested routes라 함 
        언제쓰냐? 여러 유사한 페이지 필요할때 페이지간 차이점이 딱히 없을때
        ui기능 자유롭게 만들수있다
        */}
        <Route
          path="/about"
          element={
            <div>
              <About />
            </div>
          }
        >
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>위치정보임</div>}></Route>
        </Route>
      </Routes>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
                //뒤로가기 링크 navigate("-1");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* 라우터링크 */}
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지임</Link>

      {/* <List shoes={shoes[0]} i={1}></List>;
        <List shoes={shoes[1]} i={2}></List>;
        <List shoes={shoes[2]} i={3}></List>; */}
    </div>
  );
}

function List(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.b + 1) + ".jpg"
        }
        width="80%"
        alt=""
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About(props) {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
      {/* nested routes의 element 보여주는곳은 <Outlet> */}
    </div>
  );
}

export default App;
