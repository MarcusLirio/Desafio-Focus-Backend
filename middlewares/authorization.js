
const { jwtDecode } = require('../adapter/jwt.adapter')
const response = require('../utils/response.utils')
const validator = require('validator').default

const { findOneByUserId } = require('../modules/controllers/session.controller')

function verifyToken(req, res, next) {
    const { headers } = req

    if (validator.isEmpty(headers['authorization']) || headers['authorization'] === undefined) {
        return response(
            res, 
            401, 
            'access_denied', 
            {
                type: 'access_denied',
                message: "Token precisa ser informado."
            },
            true
        )
    }

    const auth = headers['authorization'].split(' ')

    if (auth[0] !== 'Bearer')
        return response(
            res, 
            401, 
            'access_denied', 
            {
                type: 'token type',
                message: "Token's type invalid"
            },
            true
        )
    
    let { error, decoded } = jwtDecode(auth[1])
    
    if (error) {
        // implementar aqui envio de novo token
        return response(
            res, 
            401, 
            'access_denied', 
            {
                type: error.name,
                message: error.message
            },
            true
        )
    }

    let session = findOneByUserId(decoded.userId)

    if (session.lenght < 1)
        return response(
            res, 
            401, 
            'access_denied', 
            {
                type: 'invalid session',
                message: 'Sessão expirada ou inexistente'
            },
            true
        )
    
    req['userId'] = decoded.userId

    next()
}

module.exports = {
    verifyToken
}
