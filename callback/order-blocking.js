function placeOrder(order, time, cb) {
 console.log("orderNumber", order)
  deliveryFood(order, time, cb);
}

function deliveryFood(order, time, cb) {
  setTimeout(() => {
    console.log("deliveryFood", order)
    if (typeof cb == "function")
     cb();
  }, time);
}
placeOrder(1, 2000, () =>{
  placeOrder(2, 3000, () =>{
    placeOrder(3, 5000, () => {
      placeOrder(4, 1000, 0);
    });
  });
});
