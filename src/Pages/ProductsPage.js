import React from "react";
import AllProducts from "../Components/Product/AllProducts";
import { ToastContainer } from "react-toastify";

function ProductsPage() {
  return (
    <div>
      <AllProducts />
      <ToastContainer />
    </div>
  );
}

export default ProductsPage;
