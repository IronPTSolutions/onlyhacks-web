import {
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import ProtectedRoute from "./guards/ProtectedRoute";
import Home from "./views/Home/Home";
import { useAuthContext } from "./contexts/AuthContext";
import Favourites from "./views/Favourites/Favourites";

function App() {
  const { authenticationChecked } = useAuthContext()

  return (
    <div className="App">
      <Navbar />

      <div className="container">
        {authenticationChecked ? (
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />
            
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="favourites" element={<Favourites />} />
            </Route>
          </Routes>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
