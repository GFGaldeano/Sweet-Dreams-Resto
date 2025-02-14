import { Router } from 'express';
import { sendEmail } from '../services/sendEmail';

const router = Router();

router.post('/send-email', async (req, res) => {
  const { email, name } = req.body;

  try {
    const response = await sendEmail(email, name);
    res.status(200).json({ message: 'Correo enviado exitosamente', response });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo enviar el correo.' });
  }
});

export default router;
