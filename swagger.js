
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const basename = path.basename(__filename);

const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointFiles = []

let routerPath = path.join(__dirname, 'modules', 'routes')
let randomUUID = uuidv4()

fs
    .readdirSync(routerPath)
    .filter( file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (file !== 'index.js')
    })
    .forEach( file => {
        let filePath = path.join(__dirname, 'modules', 'routes', file)
        endpointFiles.push(filePath)
    })

console.log('endpointFiles', endpointFiles)

const doc = {
    info: {
        version: "1.0.0",
        title: "Desafio Focus",
        description: "Api para desafio da Focus"
    },
    host: "localhost:3001",
    basePath: "/api",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [],
    securityDefinitions: {
        apiKeyAuth:{
            type: "Bearer Token",
            in: "header",
            name: "Authorization",
            description: "Bearer token para os requests"
        }
    },
    definitions: {
        Auth: {
            $email: "email@domain.com",
            $password: "123456",
            $transactionCode: `${randomUUID}`
        },
        ServiceUpdate: {
            name: "Serviço de limpeza",
            description: "Serviço de limpeza para vidro direito."
        },
        UserActiveStatusUpdate: {
            $isActive: true | false
        },
        UserCreate: {
            $name: "John Due",
            $email: "john.due@email.com",
            $password: "123456",
            cel: "11",
            celDDD: "999999999",
            $tel: "11",
            $telDDD: "99999999",
            $userType: "seller"
        },
        UserPasswordUpdate: {
            $password: "John Due"
        }
    }
}

swaggerAutogen(outputFile, endpointFiles, doc)
    .then(async () => {
        await require('./bin/www')
    })
    .catch( error => console.log(error))
