require('dotenv-safe').config({
    path: process.env.NODE_ENV === "development"
        ? ".env.development"
        : process.env.NODE_ENV === 'production'
            ? ".env.production"
            : ".env"
})

const bcrypt = require('bcrypt');
let { model, mongoose } = require('../models/user.repository');
let response = require('../../utils/response.utils');
const { ObjectId } = mongoose.Types;
const validator = require('validator');

async function create(req, res) {
    const { transactionCode } = req
    let _data = {
        name,
        tel,
        telDDD,
        cel,
        celDDD,
        email,
        password,
        userType
    } = req.body

    if (email === null || email === undefined)
        return response(res, 400, 'email is required', null, true)
    if (!validator.isEmail(email))
        return response(res, 400, 'Make a email valid', null, true)

    if (password === null || password === undefined)
        return response(res, 400, 'password is required', null, true)
    if (validator.isEmpty(password))
        return response(res, 400, 'Make a password valid', null, true)
    if (password.length < 6 || password.length > 32)
        return response(res, 400, 'Password must contain between 6 and 32 characters', null, true)

    try {

        let hasUser = await model.find({ email }).lean()

        if (hasUser.length > 0) {
            return response(res, 400, 'This user already exists', null, true)
        } else {
            let subject = 'User created';
            let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            _data.password = hash;
            let doc = await model.create(_data);

            doc.password = undefined;

            let data = "User created"
            return response(res, 201, 'User created', data, false)
        }
    } catch (error) {
        console.log(error)
        
        let data = {
            transactionCode,
            message: error.message
        }
        return response(res, 500, 'Error into server', data, true)
    }
}

async function update(req, res) {
    const { transactionCode } = req
    const { id } = req.params

    try {
        let doc = await model.findById(id)
        if (doc) {
            let _doc = await model.findByIdAndUpdate(id, req.body, { new: true })

            if (_doc) {

                _doc.password = undefined

                let data = {
                    transactionCode,
                    item: _doc,
                }
                return response(res, 200, 'Users updated.', data, false)
            }

        } else {
            return response(res, 400, 'Users not found.', null, true)
        }
    } catch (error) {
        let data = {
            transactionCode,
            message: error.message
        }

        return response(res, 500, 'Error into server', data, true)
    }
}

async function listAll(req, res) {
    const { transactionCode } = req

    try {
        let docs
        let params = {}

        let options = {
            sort: { name: 'asc' }
        }
        let paginate = 1
        let limit = (req.query.perPage && req.query.perPage > 0) ? parseInt(req.query.perPage) : 10
        options.skip = (req.query.page && req.query.page > 0) ? (parseInt(req.query.page) - 1) * limit : 0

        if (req.query.usertype) {
            params.userType = { $regex: '.*' + req.query.usertype + '.*', '$options': 'i' }
        }

        if (req.query.name) {
            params.name = { $regex: '.*' + req.query.name + '.*', '$options': 'i' }
        }

        if (req.query.isActive) {
            params.isActive = req.query.isActive
        }

        if (req.query.email) {
            params.email = { $regex: '.*' + req.query.email + '.*', '$options': 'i' }
        }

        if (req.query.filter === 'all') {
            let totalDocs = await model.find(params).lean()
            let totalDocsOnPage = await model.find(params, null, options).lean()

            docs = await model.find(params, null, options)
                .select('-password')
                .lean()

            if ((totalDocs.length % limit) === 0)
                paginate = parseInt(totalDocs.length / limit)
            else if ((totalDocs % limit) !== 0)
                paginate = parseInt(totalDocs.length / limit) + 1

            let data = {
                items: docs,
                currentPage: req.query.page ? req.query.page : 1,
                page: req.query.page ? req.query.page : 1,
                paginate,
                transactionCode
            }

            return response(res, 200, null, data, false)
        } else {

            options.skip = (req.query.page && req.query.page > 0) ? (parseInt(req.query.page) - 1) * limit : 0

            let totalDocs = await model.find(params).lean()

            docs = await model.find(params, null, options)
                .select('-password')
                .lean()

            if ((totalDocs.length % limit) === 0)
                paginate = parseInt(totalDocs.length / limit)
            else if ((totalDocs % limit) !== 0)
                paginate = parseInt(totalDocs.length / limit) + 1

            let data = {
                items: docs,
                currentPage: req.query.page ? req.query.page : 1,
                page: req.query.page ? req.query.page : 1,
                paginate,
                transactionCode
            }

            return response(res, 200, null, data, false)
        }
    } catch (error) {
        console.log(error)
        let data = {
            transactionCode,
            message: error.message
        }
        return response(res, 500, 'Error into server', data, true)
    }
}

async function findOneByEmail(req, res) {
    const { transactionCode } = req
    const { email } = req.params
    try {
        let doc = await model.findOne({ email }).lean()

        if (doc !== null) {
            let data = {
                item: "Email already exist",
            }
            return response(res, 200, null, data, false)
        } else {
            let data = {
                item: "Email already exist",
            }
            return response(res, 200, null, data, false)
        }
  
    } catch (error) {
        let data = {
            transactionCode,
            message: error.message
        }
        return response(res, 500, 'Error into server', data, true)
    }
}

async function resetPassword(req, res) {
    const { transactionCode } = req
    const { email } = req.body
    try {
        let doc = await model.find({ email }).lean()
        if (doc === null) {
            return response(res, 400, 'User not found.', null, true)
        } else {
            let psw = Math.random().toString(36).slice(-8)
            let hash = bcrypt.hashSync(psw, bcrypt.genSaltSync(10))
            let newDoc = await model.findOneAndUpdate({ email }, { password: hash }, { new: true })
            return response(res, 200, 'Sua nova senha foi enviada para seu e-mail.', null, false)
        }
    } catch (error) {
  
        let data = {
            transactionCode,
            message: error.message
        }
        return response(res, 500, 'Error into server', data, true)
    }
}

async function updatePassword(req, res) {
    const { transactionCode } = req

    if ('password' in req.body === false)
        return response(res, 400, 'password is required.', null, true)
    if (validator.isEmpty(req.body.password) || req.body.password === null || req.body.password === undefined)
        return response(res, 400, 'Make a password valid.', null, true)
    if (req.body.password.length < 6 || req.body.password.length > 32)
        return response(res, 400, 'Password must contain between 6 and 32 characters.', null, true)

    try {
        const { userId } = req
        const { password } = req.body
        let doc = await model.find({ _id: ObjectId(userId) }, {}).lean()
        if (doc === null) {
            return response(res, 400, 'User notFound.', null, true)
        } else {
            let crypt = bcrypt.hashSync(password, salt)
            doc.password = crypt
            doc.save()
            sendMail(email, email, { password, subject: 'Password alter' }, newPasswordID)
            return response(res, 200, 'Password alter successfuly.', null, false)
        }
    } catch (error) {
        let data = {
            transactionCode,
            message: error.message
        }
        return response(res, 500, 'Error into server', data, true)
    }
}

async function findById(req, res) {
    const { transactionCode } = req
    const { id } = req.params
    try {
        let doc = await model.findById(id).lean()
        let data = {
            transactionCode,
            item: doc
        }
        return response(res, 200, null, data, false)
    } catch (error) {
        let data = {
            transactionCode,
            message: error.message
        }
        return response(res, 500, 'Error into server', data, true)
    }
}


async function deleteUserData(req, res) {
    const { transactionCode } = req
    try {
        await model.findOneAndRemove({ _id: ObjectId(id) })
        return response(res, 200, 'User deleted', docs, false)
    } catch (error) {
        let data = {
            transactionCode,
            message: error.message
        }
        return response(res, 500, 'Error into server', data, true)
    }
}

module.exports = {
    create,
    update,
    findOneByEmail,
    findById,
    listAll,
    deleteUserData,
    resetPassword,
    updatePassword,
}
