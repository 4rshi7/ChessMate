import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect().then(() => {
  console.log("Connected to the database successfully.");
})
.catch((error: Error) => {
  console.error("Error connecting to the database:", error);
});

export default prisma;