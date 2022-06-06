exports.formatError = (error, status = 400) => {
    if (error.name === 'SequelizeValidationError')
        return {
            type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            status: 400,
            title: 'One or more validation errors occurred.',
            errors: Object.assign({}, ...error.errors.map(item => ({ [item.path]: item.message })))
        }
    return { status, title: error.message }
}
exports.formatLocation = (req, id) =>  `${req.protocol}://${req.hostname}:${req.connection.localPort}${req.originalUrl}/${id}`