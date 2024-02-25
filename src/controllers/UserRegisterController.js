const bcrypt = require ('bcrypt')
const User = require('../models/UserData')

module.exports = {

    async create (request, response) {
        
        const {name, email, password, confirmpassword} = request.body;

        if(!name){
            return response.status(422).json({error: "O nome é obrigatório!"});
        }
        else if(!email){
            return response.status(422).json({error: "O email é obrigatório!"});
        }
        else if(!password){
            return response.status(422).json({error: "A senha é obrigatório!"});
        }
        else if(password !== confirmpassword){
            return response.status(422).json({error: "As senhas não conferem!"});
        }

        const userExists = await User.findOne({email: email})

        if(userExists){
            return response.status(422).json({error: "E-mail já cadastrado. Utilize outro endereço!"});
        }
        
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: passwordHash,
        })

        try{
            await user.save()
            response.status(201).json({msg:'Usuário criado com sucesso!'})
        }catch(error){
            response.status(500).json({error:'Ocorreu um erro no servidor. Tente novamente mais tarde!'})
        }

    }
};