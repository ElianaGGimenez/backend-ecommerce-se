import Ticket from "../models/Ticket.js";
import Product from "../models/Product.js";

export default class PurchaseService {
  async purchase(cart, userEmail) {
    let total = 0;
    let productsNotPurchased = [];

    for (const item of cart.products) {
      const dbProduct = await Product.findById(item.product._id);

      if (dbProduct.stock >= item.quantity) {
        total += dbProduct.price * item.quantity;
        dbProduct.stock -= item.quantity;
        await dbProduct.save();
      } else {
        productsNotPurchased.push({
          product: item.product._id,
          reason: "Stock insuficiente"
        });
      }
    }

    const ticket = await Ticket.create({
      code: crypto.randomUUID(),
      amount: total,
      purchaser: userEmail,
    });

    return { ticket, productsNotPurchased };
  }
}
