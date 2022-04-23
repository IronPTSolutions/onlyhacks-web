import {
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import NewPost from "./views/Posts/NewPost/NewPost";
import EditPost from "./views/Posts/EditPost/EditPost";
import ProtectedRoute from "./guards/ProtectedRoute";
import { useAuthContext } from "./contexts/AuthContext";
import PostDetail from "./views/Posts/PostDetail/PostDetail";
import CheckoutForm from "./views/Posts/CheckoutForm/CheckoutForm";
import Home from "./views/Home/Home";
import UserDetail from "./views/Users/UserDetail/UserDetail";
import Subscriptions from "./views/Subscriptions/Subscriptions";

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
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path="/" element={<ProtectedRoute/>} >
              <Route path="profile" element={<Profile />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="post/new" element={<NewPost />} />
              <Route path="post/:id/edit" element={<EditPost />} />
              <Route path="post/:id" element={<PostDetail />} />
              <Route path="subscribe/:userId" element={<CheckoutForm />} />
            </Route>
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
