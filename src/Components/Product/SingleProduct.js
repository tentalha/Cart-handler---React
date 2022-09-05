import React, { useContext } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { IoIosBasket } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";
import Context from "../../Context/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProduct({ product }) {
  const myContext = useContext(Context);
  const {
    state: { cart },
    dispatch,
  } = myContext;

  const handleAddItem = () => {
    toast.success(`Added to cart.`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...product, qty: 1 }])
    );
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const handleDeleteItem = () => {
    toast.error(`Removed from cart.`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => item.id !== product.id))
    );
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  };

  return (
    <div className="text-lg max-w-xs  flex flex-col gap-2 p-6 shadow-xl rounded-xl">
      <div className="relative">
        <img src={product.image} alt="" className="h-[250px] w-full " />
        {product.discountedPrice && (
          <h2 className="absolute top-0 left-0 bg-[#FF0000] px-2 text-white text-sm">
            Sale
          </h2>
        )}
      </div>
      <div className="h-16 mt-6">
        <h1 className="max-w-[210px] text-lg line-clamp-2	font-open">
          {product.title}
        </h1>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-extralight font-[#D8D8D8] capitalize ">
          {product.category}
        </span>
        <span className="flex ml-10 items-center gap-1">
          <FiThumbsUp color="#3B88F7" />
          <span className="text-sm font-thin">{product.rating.count}</span>
        </span>
      </div>
      <hr />
      <div className="flex space-x-3 items-center">
        <span
          className={`font-bold text-[#FBB931] ${
            product.discountedPrice ? "line-through text-sm" : ""
          }`}
        >
          ${product.price}
        </span>
        {product.discountedPrice && (
          <span className="font-bold text-red-600">
            ${product.discountedPrice}
          </span>
        )}
      </div>
      {cart?.some((item) => item.id === product.id) ? (
        <button
          className="bg-red-400 w-full p-1 rounded-lg text-white my-3 flex items-center justify-center text-base shadow-2xl"
          onClick={handleDeleteItem}
        >
          <IoMdRemoveCircle size={20} />
          Remove
        </button>
      ) : (
        <button
          className="bg-[#2EA44F] w-full p-1 rounded-lg my-3 text-base text-white flex items-center justify-center gap-1 shadow-2xl"
          onClick={handleAddItem}
        >
          <IoIosBasket size={20} />
          Add to cart
        </button>
      )}
    </div>
  );
}

export default SingleProduct;
