
module.exports = (response, statusCode, message = null, data = null, error = true) => {
    return response.status(statusCode).json({
        data,
        message,
        error
    })
}
