import User from "./User.js";
import Lawyer from "./Lawyer.js";
import LegalCase from "./LegalCase.js";

Lawyer.hasMany(LegalCase, { foreignKey: "lawyerId", as: "cases" });
LegalCase.belongsTo(Lawyer, { foreignKey: "lawyerId", as : "lawyer" });

export {
  User,
  Lawyer,
  LegalCase,
};
