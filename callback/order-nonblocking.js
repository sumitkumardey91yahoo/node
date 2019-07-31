function placeOrder(order, time) {
 console.log("orderNumber", order)
  deliveryFood(order, time);
}

function deliveryFood(order, time) {
  setTimeout(() => {
    console.log("deliveryFood", order)
  }, time);
}
placeOrder(1, 2000);
placeOrder(2, 3000);
placeOrder(3, 1000);
placeOrder(4, 500);
