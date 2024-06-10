const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    foodName: { type: String, required: true },
    date_of_order: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("order", orderSchema);