export const typeDefs = `#graphql
   type Item {
      id: ID!
      name: String!
      quantity: Int!
   }

   input ItemInput {
      name: String!
      quantity: Int!
   }

   type Query {
      items: [Item!]!
   }

   type Mutation {
      createItem(input: ItemInput!): Item!
      updateItem(id: ID!, input: ItemInput!): Item!
      deleteItem(id: ID!): Boolean!
   }
`;

