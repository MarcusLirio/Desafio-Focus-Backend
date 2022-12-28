
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

function jwtEncode(data) {
    let privateKey = fs.readFileSync(path.resolve(__dirname, '../privateKey.key'))
    let token = jwt.sign(data, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1 day'
    })

    return token
}

function jwtDecode(data) {
    let publicKey = fs.readFileSync(path.resolve(__dirname, '../privateKey.key.pub'))    
    
    let r = jwt.verify(data, publicKey, { algorithms: ['RS256'] }, (error, decoded) => {
                if (error) {
                    return { 
                        error: {
                            message: error.message,
                            expiredAt: error.expiredAt,
                            date: error.date,
                            inner: error.inner,
                            name: error.name
                        },
                        decoded: null 
                    }
                }
                
                return { error: null, decoded }
            })

    return r
}

module.exports = {
    jwtEncode,
    jwtDecode
}
