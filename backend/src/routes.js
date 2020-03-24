const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');

const routes = express.Router();

/*
 * 
 * ROTAS / RECURSOS
 * 
 * Methods HTTP:
 * GET    : Buscar/listar
 * POST   : Criar
 * PUT    : Alterar
 * DELETE : Apagar
 * 
 * 
 * Tipos de parametros
 * Query Params  : Nomeados e enviados via rota apos o ?
 * Route Params  : Usados para identificar recursos como /users/1 (/:id)
 * Request Body  : Recebe todos os dados (ex.: json com dados de um novo usuario)
 * 
 */

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;