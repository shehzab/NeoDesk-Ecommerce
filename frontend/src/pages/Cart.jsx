import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ensure cart state exists before accessing cartItems
  const { cartItems = [] } = useSelector((state) => state.cart) || {};

  const addToCartHandler = (product, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...product, qty }));
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      {cartItems.length === 0 ? (
        <div className="text-center text-white text-lg">
          Your cart is empty. <Link to="/shop" className="text-pink-500">Go To Shop</Link>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-semibold mb-4 text-white">Shopping Cart</h1>

          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center w-full max-w-3xl p-4 border-b">
              {/* Product Image */}
              <div className="w-20 h-20">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 ml-4">
                <Link to={`/product/${item._id}`} className="text-pink-500 font-semibold">
                  {item.name}
                </Link>
                <div className="text-gray-300">{item.brand}</div>
                <div className="text-white font-bold">${item.price}</div>
              </div>

              {/* Quantity Selector */}
              <div className="w-24">
                <select
                  className="w-full p-1 border rounded text-black"
                  value={item.qty}
                  onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                >
                  {[...Array(item.countInStock || 1).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remove Button */}
              <button className="text-red-500 ml-4" onClick={() => removeFromCartHandler(item._id)}>
                <FaTrash />
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-8 w-full max-w-3xl p-4 rounded-lg bg-gray-800">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </h2>

            <div className="text-2xl font-bold text-white">
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </div>

            <button
              className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
