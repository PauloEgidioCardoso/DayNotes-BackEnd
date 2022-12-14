const { JsonWebTokenError } = require("jsonwebtoken")

module.exports = async (request, response, next) => {
    const auth = request.headers.authorization;
    //const token = authHeader && authHeader.split(" ")[1]


    if (!auth) {
        return response.status(404).json({ msg: 'Acesso negado' })
    }

    try{
        const secret = process.env.SECRET  

        JsonWebTokenError.verify(token, secret)
        next()
    } catch (error) {
        response.status(400).json({ msg: 'Token inválido' })
    }
}