import User from "./User.js";
import Lawyer from "./Lawyer.js";
import LegalCase from "./LegalCase.js";

User.hasOne(Lawyer, { foreignKey: "userId" });
Lawyer.belongsTo(User, { foreignKey: "userId" });

Lawyer.hasMany(LegalCase, { foreignKey: "lawyerId" });
LegalCase.belongsTo(Lawyer, { foreignKey: "lawyerId" });

export {
  User,
  Lawyer,
  LegalCase,
};
