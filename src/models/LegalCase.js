import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

const LegalCase = sequelize.define(
  "LegalCase",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    case_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    plaintiff: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    defendant: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    case_type: {
      type: DataTypes.ENUM(
        "civil",
        "criminal",
        "labor",
        "commercial"
      ),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "assigned",
        "in_progress",
        "resolved"
      ),
      defaultValue: "pending",
    },

    description: {
      type: DataTypes.TEXT,
    },

    lawyer_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "legal_cases",
    underscored: true,
    timestamps: true,
  }
);

export default LegalCase;
