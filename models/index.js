const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        dialectOptions: {
            socketPath: config.dialectOptions.socketPath
        },

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.room = require("../models/room.model.js")(sequelize, Sequelize);
db.booking = require("../models/booking.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["USER", "MODERATOR", "ADMIN"];

db.booking.belongsToMany(db.user, {
    through: "user_bookings",
    foreignKey: "bookingId",
    otherKey: "userId"
});

db.user.belongsToMany(db.booking, {
    through: "user_bookings",
    foreignKey: "userId",
    otherKey: "bookingId"
});

db.room.hasMany(db.booking, {
    foreignKey: {
        allowNull: false
    }
});
db.booking.belongsTo(db.room);

module.exports = db;