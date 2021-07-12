const ApiError = require('../exeptions/api-error')
const TokenService = require('../service/token-service')


module.exports = function (req, res, next) {
    try {
        const authHandler = req.headers.authorization
        if (!authHandler) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authHandler.split(' ')[1]
        // const accessToken = authHandler.split(' ')[2]

        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}