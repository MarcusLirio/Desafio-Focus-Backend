
const { mongoose } = require('../../config/database.config')
const { Schema } = mongoose
const { String, Boolean } = mongoose.SchemaTypes
 
const UserRepository = new Schema(
    {
        email: { type: String, required: true, index: true },
        password: { type: String, required: true },
        name: { type: String, default: null },
        tel: { type: String, default: null },
        telDDD: { type: String, default: null },
        cel: { type: String, default: null },
        celDDD: { type: String, default: null },
        userType: { type: String, default: 'user' }, 
        isActive: { type: Boolean, required: true, default: false },
    },
    {
        autoIndex: false,
        emitIndexErrors: true,
        timestamps: true,
        versionKey: 'version',
    }
)

const model = mongoose.model('users', UserRepository);

module.exports = {
    mongoose,
    UserRepository,
    model,
}
