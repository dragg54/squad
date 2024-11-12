import { DataTypes } from "sequelize";
import Post from "./Post.js";
import db from "../configs/db.js";
import User from "./User.js";
import Squad from "./Squad.js";

const Donation = db.define('donation', {
    squadId: {
        type: DataTypes.INTEGER,
        references: {
            model: Squad,
            key: 'id',
        },
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true,
});


Squad.hasMany(Donation)
Donation.belongsTo(Squad, { foreignKey: 'squadId' })

export default Donation;