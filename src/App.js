import {
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
