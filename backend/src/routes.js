const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
// LOGIN
routes.post('/sessions', SessionController.create);

// LIST ONGS
routes.get('/ongs', OngController.index);

// CREATE ONG
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

// LIST INCIDENTS OF A SPECIFIC ONG
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        // pode usar o uuid ou o regex para validar
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// LIST ALL INCIDENTS WITH PAGINATION
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

// CREATE INCIDENT
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        // pode usar o uuid ou o regex para validar
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.create);

// DELETE INCIDENT
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;