import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Login, Home, Public } from "./pages/public";
import path from "./ultils/path";

import "react-multi-carousel/lib/styles.css";

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
