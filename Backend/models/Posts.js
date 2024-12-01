const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Posts = sequelize.define('Posts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    thumbnail: {
        type: DataTypes.STRING,
    },
    tags: {
        type: DataTypes.STRING,
    },
});

module.exports = Posts;
