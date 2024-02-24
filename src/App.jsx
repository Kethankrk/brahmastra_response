import "./App.css";
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/event" Component={Events} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
