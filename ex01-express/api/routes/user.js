// ex01-express/api/routes/user.js
import { Router } from "express";

const router = Router();

// READ - Obter todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// READ - Obter um usuário pelo ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// CREATE - Criar um novo usuário
router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    // Validação básica
    if (!username || !email) {
      return res.status(400).json({ error: "Username e email são obrigatórios." });
    }
    const user = await req.context.models.User.create({
      username: username,
      email: email,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    // Trata erro de unicidade do Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Usuário ou email já existe.' });
    }
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// UPDATE - Atualizar um usuário
router.put("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    const { username, email } = req.body;
    await user.update({
      username: username || user.username,
      email: email || user.email,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// DELETE - Deletar um usuário
router.delete("/:userId", async (req, res) => {
  try {
    const result = await req.context.models.User.destroy({
      where: { id: req.params.userId },
    });
    if (result === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    // Sucesso, sem conteúdo para retornar
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

export default router;
