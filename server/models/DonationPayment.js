import { DataTypes } from "sequelize";
import Post from "./Post.js";
import db from "../configs/db.js";
import User from "./User.js";
import Squad from "./Squad.js";
import Donation from "./Donation.js";

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
    donationId:{
        type: DataTypes.INTEGER,

    },
    paymentId:{
        type: DataTypes.STRING
    },
    amount:{
        type: DataTypes.INTEGER,
        references: {
            model: Donation,
            key: 'id',
        },
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
        defaultValue: 'PENDING'
    }
}, {
    timestamps: true,
  });
  
  User.hasMany(DonationPayment)
  DonationPayment.belongsTo(User, { foreignKey: 'userId'})

  Squad.hasMany(DonationPayment)
  DonationPayment.belongsTo(Squad, { foreignKey: 'squadId'})

  Donation.hasMany(DonationPayment)
  DonationPayment.belongsTo(Donation, {foreignKey: 'donationId'})

  export default DonationPayment;