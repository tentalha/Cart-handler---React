import React, { useContext, useEffect, useState } from "react";
import { BsCashCoin, BsFillStarFill } from "react-icons/bs";
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import Context from "../Context/Context";
import "./CartPage.css"; //for responsiveness

function CartPage() {
  const myContext = useContext(Context);
  const cartItems = myContext.state.cart;
  const dispatch = myContext.dispatch;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const price = cartItems.reduce(
        (previousPrice, currentPrice) =>
          previousPrice +
          (currentPrice.discountedPrice
            ? currentPrice.discountedPrice
            : currentPrice.price) *
          currentPrice.qty,
        0
      );
      setTotalPrice(price.toFixed(2));
    };
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="flex py-24 px-10 cart-container">
          <div className=" w-[68%]">
            {cartItems.map((product) => {
              return (
                <div
                  className=" flex items-center gap-4 h-auto p-3 mr-3 shadow-md mb-6 rounded-xl cart-item"
                  key={product.id}
                >
                  <div>
                    <img
                      src={product.image}
                      alt=""
                      className="h-40 w-44 object-contain"
                    />
                  </div>
                  <div className="w-[500px] flex flex-col gap-[10px]">
                    <h1 className="line-clamp-2 text-lg font-semibold font-open">
                      {product.title}
                    </h1>
                    {product.rating.count > 0 ? (
                      <span className="text-sm text-green-400">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-700">Out of stock</span>
                    )}
                    <div className="flex items-center space-x-2">
                      <span>
                        <BsFillStarFill color="#F4C430" />
                      </span>
                      <span className="text-xs">{product.rating.rate}</span>
                    </div>
                    <div>
                      <select
                        name="Qty"
                        className="w-14 text-center border rounded-lg bg-[#F0F2F2] shadow-md"
                        value={product.qty}
                        onChange={(e) => {
                          const data = cartItems;
                          const index = data.findIndex(
                            (item) => item.id === product.id
                          );
                          if (index >= 0) {
                            data[index].qty = e.target.value;
                          }

                          localStorage.setItem("cart", JSON.stringify(data));
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: product.id,
                              qty: e.target.value,
                            },
                          });
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((quantity) => (
                          <option value={quantity} key={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                      <button
                        className="mx-6 text-xs text-[#007185]"
                        onClick={() => {
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(
                              cartItems.filter((item) => item.id !== product.id)
                            )
                          );
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-bold  relative w-[100px] h-[155px] ">
                    <span className="absolute top-2 right-0 price">
                      $
                      {(product.discountedPrice
                        ? product.discountedPrice.toFixed(2)
                        : product.price.toFixed(2)) * product.qty}
                    </span>
                    {product.qty > 1 && (
                      <span className="absolute top-10 right-0 text-xs font-normal">
                        ($
                        {product.discountedPrice
                          ? product.discountedPrice
                          : product.price}
                        per piece)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[35%] h-[76vh] text-black flex flex-col gap-3 rounded-xl shadow-2xl payment-section">
            <h1 className="mx-5 mt-5 font-bold text-lg">How you'll pay?</h1>
            <div className="flex gap-2 ml-3">
              <input
                type="radio"
                id="huey"
                name="drone"
                value="huey"
                checked
                className="w-10"
              />
              <label for="huey" className="flex gap-2 items-center">
                <FaCcVisa size={35} color="#1434CB" />
                <FaCcMastercard size={35} color="#F79E1B" />
                <BsCashCoin size={35} color="#006FCF" />
              </label>
            </div>
            <div className="flex gap-2 ml-3">
              <input
                type="radio"
                id="huey"
                name="drone"
                value="huey"
                className="w-10"
              />
              <label for="huey" className="flex gap-1 items-center">
                <FaCcPaypal size={35} color="#F2C400" />
              </label>
            </div>
            <div className="flex justify-between">
              <span className="ml-4">Item(s) total</span>
              <span className="mr-6">{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="ml-4">Delivery</span>
              <span className="mr-6">$0</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span className="ml-4">
                Total({cartItems.length} item{cartItems.length > 1 ? "s" : ""})
              </span>
              <span className="mr-6">${totalPrice}</span>
            </div>
            <button className="bg-black p-3 mx-5 rounded-full font-semibold text-white">
              Proceed to checkout
            </button>
            <div className="flex gap-2 items-center p-3">
              <GoLocation />
              <h1 className="text-sm">You can pin your location.</h1>
            </div>
            <div className="text-center text-sm text-[#595959]">
              <h2>Local taxes included (where applicable)</h2>
              <h1>* Additional duties and taxes may apply</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center gap-8">
          <div className="text-3xl font-light">Oh noes! Cart is empty.</div>
          <Link
            to="/"
            className="bg-[#2EA44F] text-sm py-2 rounded-md px-2 text-white "
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
}

export default CartPage;
