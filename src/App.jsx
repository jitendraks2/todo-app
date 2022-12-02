import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Todos from "./pages/Todos";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import AccountPage from "./pages/AccountPage";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <Todos />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
