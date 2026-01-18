import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

const Lawyer = sequelize.define(
  "Lawyer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.STRING,
    },

    specialization: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "lawyers",
    underscored: true,
    timestamps: true,
  }
);

export default Lawyer;
