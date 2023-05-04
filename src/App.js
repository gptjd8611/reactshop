import { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";

function App() {
  let [shoes] = useState(data);
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="row">
        {shoes.map(function (a, i) {
          return <List shoes={shoes[i]} i={i}></List>;
        })}
        {/* <List shoes={shoes[0]} i={1}></List>;
        <List shoes={shoes[1]} i={2}></List>;
        <List shoes={shoes[2]} i={3}></List>; */}
      </div>
      <div className="main-bg"></div>
    </div>
  );
}

function List(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
        alt=""
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
