const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`user with this email: "${email}" is already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ email, password: hashPassword });
  }
}

module.exports = new UserService();
// 23.37
