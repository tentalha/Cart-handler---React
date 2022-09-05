import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import CartPage from "./Pages/CartPage";
import Navbar from "./Components/Header/Navbar";
import ContactPage from "./Pages/ContactPage";

function App() {
  return (
    <div className="App ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h1>No page found.</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
