import { prisma } from "../db/prisma.js";

const items = [
  { id: "1", name: "Widget", quantity: 10 },
  { id: "2", name: "Gadget", quantity: 5 },
];

let nextId = 3;

export const resolvers = {
  Query: {
    items: async () => {
      return prisma.item.findMany();
    },
  },
  Mutation: {
    createItem: async (_parent: unknown, args: { input: { name: string; quantity: number } }) => {
      return prisma.item.create({
         data: args.input,
      })
    },

    updateItem: async (_parent: unknown, args: { id: string; input: { name: string; quantity: number } }) => {
      return prisma.item.update({
         where: { id: Number(args.id) },
         data: args.input,
      })
    },

    deleteItem: async (_parent: unknown, args: { id: string }) => {
      await prisma.item.delete({
         where: { id: Number(args.id) },
      })
      return true
    },
  },
};