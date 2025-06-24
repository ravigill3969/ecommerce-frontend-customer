import { Routes, Route } from "react-router";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import Cart from "./page/Cart";
import { useUser } from "./context/UserContext";
import Profile from "./page/Profile";
import Success from "./page/Success";
import Search from "./page/Search";
import Wishlist from "./page/Wishlist";
import PaidOrders from "./page/PaidOrders";

function App() {
  const { isAuthenticated } = useUser();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Login />}
      />
      <Route
        path="/search"
        element={isAuthenticated ? <Search /> : <Login />}
      />
      <Route
        path="/success"
        element={isAuthenticated ? <Success /> : <Login />}
      />
      <Route
        path="/wishlist"
        element={isAuthenticated ? <Wishlist /> : <Login />}
      />
      <Route
        path="/orders"
        element={isAuthenticated ? <PaidOrders /> : <Login />}
      />
    </Routes>
  );
}

export default App;
