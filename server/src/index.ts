import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./resolvers/index.js";

const app = express();
const port = process.env.PORT ?? 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers
})

await server.start()

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server)
);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
