import { DataSource } from "typeorm";
import { Task } from "../models/task";



export const DevDataSource = new DataSource({
       type: "postgres",
       host: "localhost",        //conexão com banco de dados
       port: 5432,               //conexão com banco de dados
       username: "postgres",     //conexão com banco de dados
       password: "postgres",     //conexão com banco de dados
       database: "backend",
       entities: [Task]
})