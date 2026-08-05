import { prisma } from "../src/db/prisma.js";

async function main() {
  const tools = await prisma.category.create({ data: { name: "Tools" } });
  const parts = await prisma.category.create({ data: { name: "Parts" } });

  await prisma.item.createMany({
    data: [
      { name: "Widget", quantity: 10, categoryId: tools.id },
      { name: "Gadget", quantity: 5, categoryId: parts.id },
      { name: "Sprocket", quantity: 20, categoryId: parts.id },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });