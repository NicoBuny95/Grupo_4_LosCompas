import { Route, Routes } from "react-router-dom";
import Nav from "./Components/NavBar/Nav";
import Home from "./Components/Home/Home";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Carrito from "./Components/Carrito/Carrito";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/carrito" element={<Carrito />}/>
        <Route path="detail/:id" element={<Detail />}/>
      </Routes>
    </div>
  );
}

export default App;
