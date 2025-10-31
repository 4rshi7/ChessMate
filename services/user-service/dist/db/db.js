"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
prisma.$connect().then(() => {
    console.log("Connected to the database successfully.");
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
});
exports.default = prisma;
//# sourceMappingURL=db.js.map