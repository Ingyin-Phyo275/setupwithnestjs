import { DataSource } from "typeorm";
import { Student } from "../students/entities/student.entity";

export const AppDataSource = new DataSource({
    type: (process.env.TYPE as any) || "postgres",
    host: process.env.HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "test_db",
    synchronize: true,
    logging: true,
    entities: [Student],
    subscribers: [],
    migrations: [],
})