require('dotenv').config();
const express = require('express');
const User = require('../models/UserData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {

    async create(request, response) {
        const { name, email, password, confpassword } = request.body;

        if (!name || !email || !password || !confpassword) {
            return response.status(400).json({ error: "Preencha todos os dados" });
        }
        if (password !== confpassword) {
            return response.status(400).json({ error: "As senhas não conferem" });
        }

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return response.status(400).json({ error: "Por favor utilize outro e-mail" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const userCreated = await User.create({
            name,
            email,
            password: passwordHash
        });

        try {
            return response.json({ msg: 'Usuário criado com sucesso', name, email });

        } catch (err) {
            console.log(err);
            response.status(500).json({ msg: err });
        }
    },

    async read(request, response) {
        const { email, password } = request.body;

        if (!email) {
            return response.status(422).json({ error: "Preencha o campo e-mail" });
        }
        if (!password) {
            return response.status(422).json({ error: "Preencha o campo senha" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return response.status(404).json({ error: "Usuário não encontrado" })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return response.status(422).json({ msg: "Senha inválida" })
        }

        try {
            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
            )
            response.status(200).json({ msg: 'Autenticação realizada com sucesso', token })



        } catch (err) {
            console.log(err);
            response.status(500).json({ msg: 'Ocorreu um erro, tente novamente mais tarde' });
        }
    }


}

