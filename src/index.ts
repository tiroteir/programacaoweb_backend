import { DevDataSource } from "./connections/dbDev"
import express = require("express")
import router from "./routes/routes"

// inicializar a conexão com o banco de dadoso quando o servidor subir
DevDataSource.initialize().then() 
console.log("Databae connected!")


const app= express()
// Configurar o servidor para leitura de arquivos JSON
app.use(express.json()) // middleware to parse JSON bodies
app.use(router)


// Colocar o servidor para ouvir requisições
app.listen(3333, () => console.log ("server online on port 3333."))