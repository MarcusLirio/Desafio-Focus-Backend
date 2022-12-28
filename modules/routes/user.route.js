var express = require("express");
var router = express.Router();
const path = require("path");

const multer = require("multer");
const { v4: uuidv4 } = require('uuid')
const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, `../../uploads/users`),
        filename(req, file, callback) {
            const fileName = `${uuidv4()}-${file.originalname}`;
            return callback(null, fileName);
        },
    }),
});

const { verifyToken } = require("../../middlewares/authorization");
const { getTransactionCode } = require("../../middlewares/transactionCode");

const {
    listAll,
    create,
    findById,
    findOneByEmail,
    update,
    resetPassword,
    deleteUserData,
    updatePassword,
} = require("../controllers/user.controller");


router.get("/user", verifyToken, getTransactionCode, (req, res, next) => {
    /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para listar os dados do usuário.'
    #swagger.parameters['token'] = {
        in: 'header',
        description: 'Bearer token de autenticação do usuário.',
        type: 'string',
        required: true,
    }
    */
    getUserData(req, res);
});


router.get("/user/userid/:id", verifyToken, (req, res, next) => {
    /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para listar os dados do usuário pelo id.'
    #swagger.parameters['id'] = {
        description: 'ID do usuário',
        type: 'string',
        required: true,
    }
    */
    findById(req, res);
});

router.get("/user/checkemail/:email", (req, res, next) => {
    /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para verificar se o e-mail já está cadastrado.'
    #swagger.parameters['email'] = {
        description: 'E-mail do usuário',
        type: 'string',
        required: true,
    }
    */
    findOneByEmail(req, res);
});

router.post("/user/create", getTransactionCode, (req, res, next) => {
    /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para cadastrar novo usuário.'
    #swagger.parameters['data'] = {
        in: 'body',
        description: 'Dados do novo usuário',
        type: 'object',
        schema: { $ref: "#/definitions/UserCreate" }
    }
    */
    create(req, res);
});

router.put(
    "/user/:id/update",
    verifyToken,
    getTransactionCode,
    (req, res, next) => {
        /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para atualizar os dados do usuário.'
    #swagger.parameters['id'] = {
        description: 'ID do usuário',
        type: 'string',
    }
    #swagger.parameters['image'] = {
        in: 'body',
        description: 'Dados do usuário',
        type: 'object',
    }
    */
        update(req, res);
    }
);

router.patch(
    "/user/:id/updatepassword",
    verifyToken,
    getTransactionCode,
    (req, res, next) => {
        /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para atualizar a senha do usuário.'
    #swagger.parameters['id'] = {
        description: 'ID do usuário',
        type: 'string',
    }
    #swagger.parameters['data'] = {
        in: 'body',
        description: 'Dados da nova usuário',
        type: 'object',
        schema: { $ref: "#/definitions/UserPasswordUpdate" }
    }
    */
        updatePassword(req, res);
    }
);

router.patch(
    "/user/updatepassword",
    verifyToken,
    getTransactionCode,
    (req, res, next) => {
        /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para atualizar a senha do usuário pelo id.'
    #swagger.parameters['data'] = {
        in: 'body',
        description: 'Dados da nova usuário',
        type: 'object',
        schema: { $ref: "#/definitions/UserPasswordUpdate" }
    }
    */
        updatePassword(req, res);
    }
);

router.patch("/user/lostpassword", getTransactionCode, (req, res, next) => {
    /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para atualizar a senha do usuário que enviou o request.'
    #swagger.parameters['data'] = {
        in: 'body',
        description: 'Dados da nova usuário',
        type: 'object',
        schema: { $ref: "#/definitions/UserPasswordUpdate" }
    }
    */
    resetPassword(req, res);
});

router.patch(
    "/user/delete",
    verifyToken,
    getTransactionCode,
    (req, res, next) => {
        /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para inativar o cadastro do usuário pelo seu id.'
    #swagger.parameters['id'] = {
        description: 'ID do usuário',
        type: 'object',
        schema: { $ref: "#/definitions/UserActiveStatusUpdate" }
    }
    */
        update(req, res);
    }
);

router.delete("/user", verifyToken, getTransactionCode, (req, res, next) => {
    /** 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint para deletar todos os dados do usuário, incluindo os dados da empresa, no sistema.'
    */
    deleteUserData(req, res);
});

module.exports = router;
