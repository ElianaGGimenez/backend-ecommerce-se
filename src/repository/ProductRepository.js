export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    return this.dao.find();
  }

  getById(id) {
    return this.dao.findById(id);
  }

  create(data) {
    return this.dao.create(data);
  }

  update(id, data) {
    return this.dao.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return this.dao.findByIdAndDelete(id);
  }
}
