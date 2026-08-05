export const typeDefs = `#graphql
   type Item {
      id: ID!
      name: String!
      quantity: Int!
      categoryId: ID!
   }

   input ItemInput {
      name: String!
      quantity: Int!
      categoryId: ID!
   }

   type Query {
      items: [Item!]!
   }

   type Mutation {
      createItem(input: ItemInput!): Item!
      updateItem(id: ID!, input: ItemInput!): Item!
      deleteItem(id: ID!): Boolean!
   }

   type Category {
    id: ID!
    name: String!
  }

  type Item {
    id: ID!
    name: String!
    quantity: Int!
    category: Category!
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

