export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getById(id) {
    return this.dao.findById(id).populate("products.product");
  }

  create(data) {
    return this.dao.create(data);
  }

  update(id, data) {
    return this.dao.findByIdAndUpdate(id, data, { new: true });
  }
}
