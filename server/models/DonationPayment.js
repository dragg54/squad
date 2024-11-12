import { DataTypes } from "sequelize";
import Post from "./Post.js";
import db from "../configs/db.js";
import User from "./User.js";
import Squad from "./Squad.js";

const DonationPayment = db.define('donationPayment', {
    squadId:{
        type: DataTypes.INTEGER,
        references: {
            model: Squad,
            key: 'id',
        },
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    amount:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true,
  });
  
  User.hasMany(DonationPayment)
  DonationPayment.belongsTo(User, { foreignKey: 'userId'})

  Squad.hasMany(DonationPayment)
  DonationPayment.belongsTo(Squad, { foreignKey: 'squadId'})

  export default DonationPayment;