const bcrypt = require('bcrypt');
class User {
  constructor(userId, name, role, password, statusMessage, location) {
    this.userId = userId;
    this.name = name;
    this.password = password;
  }

  static async userIdUnique(userId) {
    try {
      const user = await this.findOneById(userId);
      if (user) return false;
    } catch (err) {
      return true;
    }
    return true;
  }

  async create() {
    const hashedPassword = await this.hashPassword(this.password);

    //user 생성 함수 , db 만들어지면 진행

    return null;
  }

  static async findOneById(userId) {
    //  DB가 생기면 작성

    return true;
  }

  static async deleteById(userId) {
    const user = await this.findOneById(userId);
    if (!user) {
      return false;
    } else {
      //지우는 process 디비 만들면 작성
      return true;
    }
  }

  static destruct = (user) => {
    const { password, ...userDTO } = user;
    return userDTO;
  };

  static validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  }
}
