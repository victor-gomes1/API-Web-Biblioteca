import { Router } from "express";
import { LivroController } from "../controllers/LivroController";

const router = Router();
const livroController = new LivroController(); 

// Conecta as rotas RESTful aos métodos do Controller
// ------------------------------------------------------------------

// POST /api/livros -> Criar
router.post("/", livroController.create);             

// GET /api/livros -> Ler Todos
router.get("/", livroController.findAll);             

// GET /api/livros/:id -> Ler por ID
router.get("/:id", livroController.findOne);          

// PUT /api/livros/:id -> Atualizar (completo)
router.put("/:id", livroController.update);           

// DELETE /api/livros/:id -> Excluir
router.delete("/:id", livroController.delete);        

export default router;