import {
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import Favourites from "./views/Favourites/Favourites";
import ProtectedRoute from "./guards/ProtectedRoute";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { isAuthenticationFetched } = useAuthContext()
  return (
    <div className="App">
      <Navbar />

      <div className="container">
        {!isAuthenticationFetched ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path="/" element={<ProtectedRoute/>} >
              <Route path="profile" element={<Profile />} />
              <Route path="favourites" element={<Favourites />} />
            </Route>

          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
