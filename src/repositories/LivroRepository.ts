import { AppDataSource } from "../config/data-source";
import { Livro } from "../entities/Livro";
import { Repository } from "typeorm";

// Exportamos o Repositório TypeORM já configurado
export const LivroRepository: Repository<Livro> = AppDataSource.getRepository(Livro);