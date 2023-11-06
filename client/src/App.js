import { Route, Routes } from "react-router-dom";
import Nav from "./Components/NavBar/Nav";
import Home from "./Components/Home/Home";
import Detail from "./Components/Detail/Detail";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="detail/:id" element={<Detail />}/>
      </Routes>
    </div>
  );
}

export default App;
