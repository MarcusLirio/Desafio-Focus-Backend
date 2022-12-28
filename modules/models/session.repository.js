
const { mongoose } = require('../../config/database.config')
const { Schema } = mongoose
const { String, ObjectId } = mongoose.SchemaTypes
const moment = require('moment')

const SessionRepository = new Schema(
    {
        token: { type: String },
        userId: { type: ObjectId, ref: 'Users' },
        lastLogin: { type: String, default: moment().toISOString() },
    },
    {
        autoIndex: false,
        emitIndexErrors: true,
        timestamps: true,
        versionKey: 'version'
    }
)

const model = mongoose.model('sessions', SessionRepository);

module.exports = {
    mongoose,
    model,
    SessionRepository
}
