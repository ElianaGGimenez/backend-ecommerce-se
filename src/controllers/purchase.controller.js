import Cart from "../../models/Cart.js";
import CartRepository from "../repository/CartRepository.js";
import TicketRepository from "../repository/TicketRepository.js";
import PurchaseService from "../services/PurchaseService.js";

const cartRepo = new CartRepository(Cart);
const ticketRepo = new TicketRepository((await import("../models/Ticket.js")).default);
const purchaseSvc = new PurchaseService(ticketRepo, cartRepo);

export const checkout = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const purchaserEmail = req.user.email;
    const result = await purchaseSvc.checkout(cartId, purchaserEmail);
    res.json({ status: "success", ...result });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
