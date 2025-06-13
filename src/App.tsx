import { Routes, Route } from "react-router";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import Cart from "./page/Cart";
import { useUser } from "./context/UserContext";
import Profile from "./page/Profile";
import Success from "./page/Success";

function App() {
  const { isAuthenticated } = useUser();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
      <Route path="/success" element={isAuthenticated ? <Success /> : <Login />} />
    </Routes>
  );
}

export default App;
