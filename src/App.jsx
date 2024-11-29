import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./component/Footer"
import Navbar from "./component/Navbar"
import ProductCard from "./component/ProductCard"
import Cart from "./component/Cart";
import { useState } from "react";
import Banner from "./component/Banner";
import ProductDetails from "./component/ProductDetails";

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const HandleSearch = (query) => {
    setSearchQuery(query);
  }
  return (
    <>
      <Navbar onSearchChange={HandleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner onSearch={searchQuery} />
              <ProductCard onSearch={searchQuery} />
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
