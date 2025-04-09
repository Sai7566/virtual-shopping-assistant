import express from 'express';
import { getChatbotResponse } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const userMessage = req.body.message;
  console.log("📩 Received:", userMessage);

  const response = getChatbotResponse(userMessage);
  res.json({ response });
});

export default router;



