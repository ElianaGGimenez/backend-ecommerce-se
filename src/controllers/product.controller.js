import Product from "../models/Product.js";
import ProductRepository from "../repository/ProductRepository.js";

const productRepo = new ProductRepository(Product);

export const createProduct = async (req, res) => {
  try {
    const p = await productRepo.create(req.body);
    res.status(201).json({ status: "success", product: p });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const listProducts = async (req, res) => {
  const products = await productRepo.getAll();
  res.json({ status: "success", products });
};

export const getProduct = async (req, res) => {
  const p = await productRepo.getById(req.params.id);
  if (!p) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
  res.json({ status: "success", product: p });
};

export const updateProduct = async (req, res) => {
  try {
    const p = await productRepo.update(req.params.id, req.body);
    res.json({ status: "success", product: p });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productRepo.delete(req.params.id);
    res.json({ status: "success", message: "Eliminado" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
