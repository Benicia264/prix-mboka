import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const markets = ["Total", "Poto-Poto", "Moungali", "Ouenzé", "Talangaï"];
  const products = [
    { name: "Manioc", unit: "tas" },
    { name: "Tomate", unit: "tas" },
    { name: "Huile de palme", unit: "litre" },
    { name: "Poisson salé", unit: "kg" },
    { name: "Riz", unit: "kg" },
  ];

  for (const name of markets) {
    await prisma.market.upsert({ where: { name }, update: {}, create: { name } });
  }
  for (const p of products) {
    await prisma.product.upsert({ where: { name: p.name }, update: {}, create: p });
  }

  await prisma.user.upsert({
    where: { email: "test@prixmboka.cg" },
    update: {},
    create: {
      email: "test@prixmboka.cg",
      name: "Compte Test",
      password: await bcrypt.hash("Test1234!", 10),
    },
  });
}

main().finally(() => prisma.$disconnect());