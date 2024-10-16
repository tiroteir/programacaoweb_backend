import { DevDataSource } from "../connections/dbDev";
import { Task } from "../models/task";


//1) estabelece conexão com a tabela alvo no banco de dados  através de um cursor. Um cursor é um objeto que permite fazer consultas ao bancco de dados via apkicação  essas cpsuiltas são feitas na tabeça do repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Task)

// 20 cria interfaces para receber dados do CONTROLLER, que por sua vez vieram lá da requisição HTTP lá do FRONTEND

type newTasktRequest={
    description: string,
    date_task: Date
}

type findTaskRequest ={
    id: string
}

type updateTaskRequest ={
    id: string,
    description: string,
    date_task: Date
}

export class TaskService {
    async createTask ({description, date_task}:newTasktRequest) : Promise<Task | Error>{
        // INSET INTO tasks VALUES (description, date_task)
        try{
            const task = cursor.create({
                description, date_task
            
               })
               // a função cursor.save() executa a instrução INSERT na tabela
       await cursor.save(task)
       return task 
        
      
    }

       catch (err){
        return new Error ("Unexpected error saving task!")

       }
    }
       

    
    async readOneTask({id}: findTaskRequest) : Promise <Task | Error> {
        try{
           // SELECT * FROM tasks Where id = id LIMIT 1
        const task = await cursor.findOne ({ where: {id}})
        if (!task){
            return new Error("Task not found!")
        }
        return task  
            
        }
        catch(err){
            return new Error("Unexpected error reading task")
        }
    }

        
    
    
    async readAllTask(): Promise <Task [] | Error> {
        try{
            //SELECT * FROMM tasks
        const tasks = await cursor.find()
        return tasks
        }
        catch (err){
            return new Error("Unexpected error reading tasks!")
        }
        
    }
    
    async updateTask({id, description, date_task}: updateTaskRequest) : Promise<Task | Error> {
        try{
        // SELECT * FROM taks WHERE id = id LIMIT
        const task = await cursor.findOne ({where: {id}})
        if (!task){
            return new Error("Task not found!")
        }
         // Se gouver uma nova descrição e/ou data informados pelo usuário vindos da requisição, a tarefa será atualizada com novos dados; senão, os dados antigos 
        task.description = description ? description: task.description
        task.date_task = date_task ? date_task: task.date_task

        // UPDATE tasks WHERE id = id SET description = description, date_task = date_task
        await cursor.save(task)
        return task
    }
    catch(err){
        return new Error("Unexpected error updating task!")
    }

    }
    
    async deleteTask({id}: findTaskRequest): Promise <String | Error> {
        try{
        const task = await cursor.findOne ({where: {id}})
        if (!task){
            return new Error("Task not found!")
    }
    await cursor.delete(task.id)
    return "Task removed successfully!"

      }
      catch(err){
        return new Error("Unexpected error deleting task!")
      }
    }
}


// se...então..senão  
// if (x % 2 ==0 ){
// console.log ("par")
//}
// else {
//}
// operador termário --> (x % 2 ==0) ? console.log ("par") : console.log ("impar")
