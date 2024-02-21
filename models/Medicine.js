'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Medicine extends Model {
        static associate(models) {
        }
    }

    Medicine.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Medicine',
        tableName: 'medicine'
    });

    return Medicine;
};
