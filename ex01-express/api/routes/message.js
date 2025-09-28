import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const messages = await req.context.models.Message.findAll();
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.get("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );
    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, userId } = req.body;
    if (!text || !userId) {
      return res.status(400).json({ error: "O texto e o userId são obrigatórios." });
    }
    const user = await req.context.models.User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: "Usuário autor não encontrado." });
    }
    const message = await req.context.models.Message.create({
      text,
      userId, 
    });
    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.put("/:messageId", async (req, res) => {
    try {
      const message = await req.context.models.Message.findByPk(req.params.messageId);
      if (!message) {
        return res.status(404).json({ error: "Mensagem não encontrada." });
      }
      const { text } = req.body;
      await message.update({
        text: text || message.text,
      });
      return res.status(200).json(message);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  });

router.delete("/:messageId", async (req, res) => {
  try {
    const result = await req.context.models.Message.destroy({
      where: { id: req.params.messageId },
    });
    if (result === 0) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

export default router;