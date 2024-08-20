import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import {
  CreateCard,
  CreateUser,
  DeleteCard,
  GetCard,
  GetCardGroup,
} from "./db";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .post("/createuser", async (req: any) => {
    const { id, name } = req.body;
    await CreateUser(id, name);
    return "User created!";
  })
  .post("/createcard", async (req: any) => {
    const { userId, name, items, questions, answers } = req.body;
    const question = JSON.parse(questions);
    const answer = JSON.parse(answers);
    await CreateCard(userId, name, items, question, answer);
    return "Card created!";
  })
  .post("/fetchcardgroup/:id", async (req: any) => {
    const { id } = req.params;
    const cards = await GetCardGroup(id);
    return cards;
  })
  .post("/fetchcard/:id", async (req: any) => {
    const { id } = req.params;
    const card = await GetCard(id);
    return card;
  })
  .delete("/deletecard/:id", async (req: any) => {
    const { id } = req.params;
    await DeleteCard(id);
    return "Card deleted!";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
