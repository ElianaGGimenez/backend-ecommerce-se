export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  findByEmail(email) {
    return this.dao.findOne({ email });
  }

  findById(id) {
    return this.dao.findById(id);
  }

  create(userData) {
    return this.dao.create(userData);
  }

  update(id, data) {
    return this.dao.findByIdAndUpdate(id, data, { new: true });
  }
}
