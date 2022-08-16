import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div>
      {!userName && <Login />}
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
