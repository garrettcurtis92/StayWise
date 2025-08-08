const { PrismaClient } = require("@prisma/client"); async function checkUrl() { console.log("Database URL:", process.env.DATABASE_URL); } checkUrl();
