import { mailgunClient } from './mailgun';

export const sendEmail = async (to: string, name: string) => {
  const DOMAIN = 'sandboxf0c643993e13401582519548447d0c04.mailgun.org'; 
  const subject = 'Bienvenido a Sweet Dreams - Resto Reserve';
  const text = `Hola, ${name}, gracias por elegirnos. Estaremos trayéndote las mejores ofertas y descuentos para el restaurante. Gracias por utilizar nuestra plataforma. Saludos cordiales`;

  try {
    const response = await mailgunClient.messages.create(DOMAIN, {
      from: 'noreply@sandboxf0c643993e13401582519548447d0c04.mailgun.org', 
      to,
      subject,
      text,
    });

    return response;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw new Error('No se pudo enviar el correo.');
  }
};
