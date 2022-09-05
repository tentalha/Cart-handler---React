import React, { useContext } from "react";
import SingleProduct from "./SingleProduct";
import Context from "../../Context/Context";


function AllProducts() {
  const myContext = useContext(Context);
  const items = myContext.state.products;

  return (
    <section
      className="min-h-screen pt-16  container mx-auto px-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

     "
    >
      {items?.map((product) => (
        <SingleProduct product={product} key={product.id} />
      ))}
    </section>
  );
}

export default AllProducts;
