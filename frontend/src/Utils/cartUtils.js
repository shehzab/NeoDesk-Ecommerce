export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  state.itemsPrice = addDecimals(itemsPrice);
  state.shippingPrice = addDecimals(shippingPrice);
  state.taxPrice = addDecimals(taxPrice);
  state.totalPrice = totalPrice;

  localStorage.setItem(
    "cart",
    JSON.stringify({ cartItems: state.cartItems })
  );
  return state;
};
