import mailgun from 'mailgun.js';
import formData from 'form-data';


const API_KEY = '9af0515bfbe87f0c0bd1d650e7e39268-6df690bb-45b3d3dc'; 
const DOMAIN = 'sandboxf0c643993e13401582519548447d0c04.mailgun.org'; 

const mg = new mailgun(formData);

export const mailgunClient = mg.client({
  username: 'api',
  key: API_KEY,
});
