import { DataTypes } from "sequelize";
import User from "./User.js";
import db from "../configs/db.js";
import Squad from "./Squad.js";

const Invite = db.define('invite', {
    invitedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    squadId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tokenHasBeenUsed: {
       type: DataTypes.BOOLEAN
    },
    expiresAt: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
        defaultValue: 'PENDING',
    },
});

Invite.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Invite, { foreignKey: 'userId', onDelete: 'CASCADE', });

Invite.belongsTo(Squad, { foreignKey: 'squadId' });
Squad.hasMany(Invite, { foreignKey: 'squadId', onDelete: 'CASCADE', });

db.sync()
    .then(() => {
        console.log('Invite table has been created.');
    })
    .catch(err => console.log(err));

export default Invite;
