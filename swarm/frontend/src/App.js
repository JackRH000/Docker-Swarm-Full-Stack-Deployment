import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Login from "./pages/Login";
import Solve from "./pages/Solve";
import Register from "./pages/Register";
import Solution from "./pages/Solution";
import { useState } from "react";


function App() {

  const [id, setId] = useState(null)

  const getID = (login_id) => {
      setId(login_id)
  }

  const logout = () => {
    setId(null)
  }

  return (
    <div className="App">
      <Navigation id={id} logout={logout} />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="/login" element={<Login getID={getID}/>}/>
            <Route path="/solve" element={<Solve id={id}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/solution/:solution_id" element={<Solution />} />
            <Route path="*"/>
        </Routes>
    </div>
  );
}

export default App;
