import { useReducer } from "react";
import Context from "./Context";
import { reducer } from "./Reducer";
import AllProducts from "../products";

function AppContext({ children }) {
  let cartData = localStorage.getItem("cart");
  cartData = JSON.parse(cartData);
  const initialState = {
    products: AllProducts,
    cart: cartData ? cartData : [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppContext;
