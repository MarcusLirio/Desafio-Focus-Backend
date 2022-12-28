var express = require('express');
var router = express.Router();

const { verifyToken } = require('../../middlewares/authorization')

const { create, adminCreate } = require('../controllers/authentication.controller')


router.post('/authenticate', (req, res, next) => {
    /** 
    #swagger.tags = ['Authentication']
    #swagger.description = 'Endpoint para realizar a autenticação do usuário'
    #swagger.parameters['data'] = { 
        in: 'body',
        description: 'Informações do usuário.',
        type: 'object',
        schema: { $ref: "#/definitions/Auth" } 
    }
    */

    return create(req, res)
})

module.exports = router;
