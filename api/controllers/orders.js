const Order = require("../models/order");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(orders => {
      res.status(200).json({
        count: orders.length,
        orders: orders.map(order => {
          return {
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
            request_url: {
              type: "GET",
              url: "http:localhost:3000/orders/" + order._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
