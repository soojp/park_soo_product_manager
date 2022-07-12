import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import OneProduct from "./components/OneProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route default path="/" element={<Main />} />
          <Route path="/product/:id" element={<OneProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
