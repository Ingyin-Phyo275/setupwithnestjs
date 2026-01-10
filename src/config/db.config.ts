import { DataSource } from "typeorm";
import { Question } from "../questions/entities/question.entity";
import { Result } from "../results/entities/result.entity";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: (process.env.TYPE as any) ,
    host: process.env.HOST ,
    port: Number(process.env.DB_PORT) ,
    username: process.env.DB_USER ,
    password: process.env.DB_PASS ,
    database: process.env.DB_NAME ,
    synchronize: true,
    logging: true,
    entities: [Question, Result],
    subscribers: [],
    migrations: [],
})