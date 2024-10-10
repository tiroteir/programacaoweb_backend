import {Request, Response} from "express"
import { TaskService } from "../services/taskService"

const service = new TaskService()

export class TaskController {  // O que está vindo do body --> é o corpo da página // o que passa pela URL é parâmetro
    async createTask(req: Request, res: Response){
        // captura Informações do Formulário
        const {description, date_task} = req.body
        // Passa informações capturadas para o service

        const result = await service.createTask( {description, date_task})

        if (result instanceof Error){
            return res.status (500).json (result.message)

        }

        return res.status (201) . json (result)
    
    }

    async readAllTask(req: Request, res: Response){ 
          // A Variável "result" nesse caso será uma lista de tarefas 
          const result = await service.readAllTask() 
          if (result instanceof Error){
            return res.status (500).json (result.message)
          }
          //Se a lista estiver vazia 
          if(result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json ('No tasks found')
          }
        }

    async readOneTask(req: Request, res: Response){
        const {id} = req.params 
        const result = await service.readOneTask ({id})
        if (result instanceof Error){
            res.status (404).json (result.message)
        }

        return res.json (result)
    }    

    async updateTask(req: Request, res: Response){
        const {id} = req.params
        const {description, date_task} = req.body
        const result = await service.updateTask ({id,description, date_task})
        if (result instanceof Error){
            return res.status(404).json (result.message)
        }

        return res.status (200).json (result)
    }    

    async deleteTask(req: Request, res: Response){
        const {id} = req.params
        const result = await service.deleteTask ({id})
        if (result instanceof Error){
            return res.status(404).json (result.message)
        }
        return res.status(200).json (result)
    }  

}