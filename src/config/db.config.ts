import { DataSource } from "typeorm";
import { Question } from "../questions/entities/question.entity";
import { Result } from "../results/entities/result.entity";


export const AppDataSource = new DataSource({
    type: (process.env.TYPE as any) || "postgres",
    host: process.env.HOST || "aws-1-ap-south-1.pooler.supabase.com",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres.pehryytrnjhhpxrzmzil",
    password: process.env.DB_PASS || "IngyinPhyo2752001",
    database: process.env.DB_NAME || "postgres",
    synchronize: true,
    logging: true,
    entities: [Question, Result],
    subscribers: [],
    migrations: [],
})