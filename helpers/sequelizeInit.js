const Sequelize = require("sequelize");

const sequelize = new Sequelize("JquNDev7GA", "JquNDev7GA", "vYpSRLmr34", {
  host: "remotemysql.com",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

const Model = Sequelize.Model;
class Users extends Model {}
Users.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    },
    unique: {
      args: true,
      msg: "Email address already in use!"
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  joinedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: "users"
});
class Levels extends Model {}
Levels.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  level: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: "levels"
});
Levels.hasMany(Users);

module.exports = {
  Users,
  Levels
};