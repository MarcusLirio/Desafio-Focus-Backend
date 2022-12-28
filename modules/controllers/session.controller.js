
let { model } = require('../models/session.repository')
let response = require('../../utils/response.utils')

const { jwtEncode } = require('../../adapter/jwt.adapter')

async function create(userId) {
    try {
        let token = jwtEncode({userId})
        let hasSession = model.findOne(userId)
        if (hasSession !== null) {
            let session = await model.updateOne({userId}, {token, userId, lastLogin: Date.now})
            return token
        } else {
            let doc = await model.create({token, userId})
            doc.save()
            return token
        }
    } catch (error) {
        console.log(error)
    }
}

async function listAll(res) {
    try {
        let docs = await model.find({}).lean()
        
        return response(res, 200, null, docs, false)
    } catch (error) {
        return response(res, 500, error, null, true)
    }
}

async function findOneByUserId(userId) {
    try {
        let doc = await model.find({userId}).lean()
        return doc
    } catch (error) {
        return response(res, 500, error, null, true)
    }
}

async function findById(res, { id }) {
    try {
        let doc = await model.findById(id).lean()
        return response(res, 200, null, doc, false)
    } catch (error) {
        return response(res, 500, error, null, true)
    }
}

module.exports = {
    findById,
    findOneByUserId,
    listAll,
    create
}
