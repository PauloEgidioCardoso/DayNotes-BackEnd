const jwt = require ('jsonwebtoken')
const User = require('../models/UserData')

module.exports = {

    async read (request, response) {

        const id = request.params.id

        const user = await User.findById(id,'-password')

        if(!user){
            return response.status(404).json({msg: 'Usuário não encontrado'})
        }

        return response.status(200).json({user})
    },

    checkToken
}

function checkToken(request, response, next){
    
    const authHeader = request.headers['authorization']

    const token = authHeader && authHeader.split(" ")[1]

    if (!token){
        return response.status(401).json({msg: 'Acesso negado!'})
    }

    try {

      const secret = process.env.SECRET

      jwt.verify(token, secret)

      next()

    } catch (error) {
        return response.status(400).json({msg: 'Token inválido!'})
    }
}
