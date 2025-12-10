import { Request, Response } from "express";
import { LivroRepository } from "../repositories/LivroRepository";
import { Livro } from "../entities/Livro";

export class LivroController {

    // 1. Criar: POST /api/livros
    async create(req: Request, res: Response): Promise<Response> {
        const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

        // Lógica de Negócio: Validação de campos obrigatórios
        if (!titulo || !autor || !isbn || !anoPublicacao) {
            return res.status(400).json({ message: "Campos obrigatórios ausentes." });
        }
        
        try {
            // Lógica de Negócio: Checar unicidade do ISBN
            const livroExistente = await LivroRepository.findOneBy({ isbn });
            if (livroExistente) {
                return res.status(409).json({ message: `Livro com ISBN ${isbn} já cadastrado.` });
            }

            // Cria e Salva o Livro (TypeORM)
            const novoLivro = LivroRepository.create({
                titulo,
                autor,
                isbn,
                anoPublicacao: Number(anoPublicacao),
                disponivel: disponivel ?? true
            });

            await LivroRepository.save(novoLivro);

            return res.status(201).json(novoLivro); // 201 Created
        } catch (error) {
            console.error("Erro ao criar livro:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // 2. Ler Todos: GET /api/livros
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const livros = await LivroRepository.find();
            return res.status(200).json(livros); // 200 OK
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // 3. Ler por ID: GET /api/livros/:id
    async findOne(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
             return res.status(400).json({ message: "ID inválido." });
        }

        try {
            const livro = await LivroRepository.findOneBy({ id });

            // Lógica de Negócio: Tratar 404
            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado." }); // 404 Not Found
            }
            
            return res.status(200).json(livro);
        } catch (error) {
            console.error("Erro ao buscar livro por ID:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // 4. Atualizar: PUT /api/livros/:id
    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const updateData = req.body;

        if (isNaN(id)) {
             return res.status(400).json({ message: "ID inválido." });
        }

        try {
            let livro = await LivroRepository.findOneBy({ id });
            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado para atualização." });
            }

            // Lógica de Negócio: Se o ISBN está sendo alterado, checar conflito
            if (updateData.isbn && updateData.isbn !== livro.isbn) {
                const outroLivro = await LivroRepository.findOneBy({ isbn: updateData.isbn });
                if (outroLivro) {
                    return res.status(409).json({ message: `ISBN ${updateData.isbn} já está em uso.` });
                }
            }

            // TypeORM.merge facilita a atualização parcial ou completa (PUT/PATCH)
            LivroRepository.merge(livro, updateData);
            await LivroRepository.save(livro);
            
            return res.status(200).json(livro);
        } catch (error) {
            console.error("Erro ao atualizar livro:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // 5. Excluir: DELETE /api/livros/:id
    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
             return res.status(400).json({ message: "ID inválido." });
        }

        try {
            const result = await LivroRepository.delete(id);

            // Se nenhum registro foi afetado, o livro não existia
            if (result.affected === 0) {
                return res.status(404).json({ message: "Livro não encontrado para exclusão." });
            }

            return res.status(204).send(); // 204 No Content (sucesso sem corpo de resposta)
        } catch (error) {
            console.error("Erro ao excluir livro:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}