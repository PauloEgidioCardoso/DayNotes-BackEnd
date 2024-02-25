const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const User = require('../models/UserData')

module.exports = {

    async create (request, response) {

        const {email, password} = request.body;

        if(!email){
            return response.status(422).json({error: 'O email é obrigatório!'});
        }
        else if(!password){
            return response.status(422).json({error: 'A senha é obrigatório!'});
        }

        const user = await User.findOne({email: email})

        if(!user){
            return response.status(404).json({error: 'Usuário não encontrado!'});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword){
            return response.status(422).json({error: 'Senha inválida!'});
        }

        try {
           
            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                    id:user.id,
                },
                secret,
            )
            
            return response.status(422).json({msg: 'Autenticação realizada com sucesso',token});

        } catch (error) {
            response.status(500).json({error:'Ocorreu um erro no servidor. Tente novamente mais tarde!'})
        }
    }
}