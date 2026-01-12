import { DataSource } from "typeorm";
import { Question } from "../questions/entities/question.entity";
import { Result } from "../results/entities/result.entity";

export const AppDataSource = new DataSource({
  type: "postgres", // ✅ MUST be hardcoded
  url: process.env.DATABASE_URL, // ✅ Railway provides this
  synchronize: true, // ⚠️ OK for now, disable later
  logging: true,
  entities: [Question, Result],
});
