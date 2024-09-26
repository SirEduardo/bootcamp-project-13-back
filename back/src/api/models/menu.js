const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    creation_date: { type: Date, default: Date.now },
  },
  {
    collection: "menus",
  }
);

const Menu = mongoose.model("menus", menuSchema, "menus");
module.exports = Menu;
