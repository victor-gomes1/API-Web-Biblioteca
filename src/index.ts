// Caminho CORRETO, apontando para a subpasta 'config'
import { AppDataSource } from "./config/data-source"; 
import express from "express";
import livroRoutes from "./routes/livroRoutes";

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com o Banco de Dados inicializada com sucesso!");

        const app = express();

        // Middleware para parsear JSON no corpo das requisições
        app.use(express.json());

        // Conecta as rotas da Entidade Livro
        // Todas as rotas começarão com /api/livros
        app.use("/api/livros", livroRoutes);

        // Inicia o servidor Express
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}. Acesse: http://localhost:${PORT}`);
        });
    })
    .catch((error: any) => console.error("Erro durante a inicialização do DB:", error));