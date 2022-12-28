const bcrypt = require('bcrypt')
let { model } = require('../models/user.repository')
let session = require('./session.controller')
let response = require('../../utils/response.utils')
const validator = require('validator')


async function create(req, res) {
    
    if('email' in req.body === false)
        return response(res, 400, 'email é um campo obrigatório.', null, true)
    if(!validator.isEmail(req.body.email) || validator.isEmpty(req.body.email) || req.body.email === null || req.body.email === undefined)
        return response(res, 400, 'Informe um email válido.', null, true)
    if('password' in req.body === false)
        return response(res, 400, 'password é um campo obrigatório.', null, true)
    if(validator.isEmpty(req.body.password) || req.body.password === null || req.body.password === undefined)
        return response(res, 400, 'Senha deve ser informada.', null, true)
    
    try {
        debugger
        const { email, password } = req.body
        let user = await model.findOne({ email }).lean()
        if (user === null) {
            return response(res, 400, 'Usuário não identificado.')
        // } else if (user && (user.userType === 'seller')) {
        //     return response(res, 400, 'Permissão de acesso negada.')
        } else {
            let isValid = bcrypt.compareSync(password, user.password)

            if (!isValid) {
                return response(res, 400, 'Senha inválida.')
            } else {
                let token = await session.create(user._id)
                return response(res, 200, 'Login efetuado com sucesso', token, false)
            }
        }
    } catch (error) {
        console.log(error)
        return response(res, 500, error, null, true)
    }
}

async function listAll(res, { skip }) {
    try {
        let docs = await model.find({}, null, { skip, limit: limit }).lean()
        return response(res, 200, null, docs, false)
    } catch (error) {
        return response(res, 500, error, null, true)
    }
}

async function findById(res, { id }) {
    try {
        let docs = await model.findById(id).lean()
        return response(res, 200, null, docs, false)
    } catch (error) {
        return response(res, 500, error, null, true)
    }
}


module.exports = {
    findById,
    create,
    listAll,
}
