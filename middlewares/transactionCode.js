
const response = require('../utils/response.utils')

function getTransactionCode(req, res, next) {
    var method = req.method
    switch (method) {
        case 'GET':
            if ('x-transaction-code' in req.headers) {
                var code = req.headers['x-transaction-code']
                req.transactionCode = code
            } else req.transactionCode = null
            break
        case 'POST':
            if ('transactionCode' in req.body) {
                req.transactionCode = req.body.transactionCode
            } else req.transactionCode = null
            break
        case 'PATCH':
            if ('transactionCode' in req.body) {
                req.transactionCode = req.body.transactionCode
            } else req.transactionCode = null
            break
        case 'PUT':
            if ('transactionCode' in req.body) {
                req.transactionCode = req.body.transactionCode
            } else req.transactionCode = null
            break
        case 'DELETE':
            if ('x-transaction-code' in req.headers) {
                var code = req.headers['x-transaction-code']
                req.transactionCode = code
            } else req.transactionCode = null
            break
    }

    next()
}

module.exports = {
    getTransactionCode
}
