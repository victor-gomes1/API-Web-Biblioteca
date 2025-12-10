import "reflect-metadata";
import { DataSource } from "typeorm";
import { Livro } from "../entities/Livro"; // Importa a Entidade Livro

// 1. Configuração do DataSource
export const AppDataSource = new DataSource({
    // Tipo de banco de dados
    type: "sqlite",

    // Caminho para o arquivo do banco de dados (será criado na raiz do projeto)
    database: "biblioteca.sqlite",

    // Sincroniza o esquema do banco de dados automaticamente com as entidades
    // ATENÇÃO: Use 'true' apenas em desenvolvimento. Em produção, use Migrations.
    synchronize: true,

    // Exibe as queries SQL executadas no console (útil para debug)
    logging: true,

    // Lista de entidades que o TypeORM deve mapear
    entities: [Livro], 

    // Lista de migrações (não usado aqui, pois estamos usando 'synchronize: true')
    migrations: [],

    // Assinantes
    subscribers: [],
});