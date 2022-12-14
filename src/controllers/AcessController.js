const express = require('express');
const User = require('../models/UserData');
const bcrypty = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./TokenController');


module.exports = {
    async read(request, response) {
        const id = request.params.id

        const user = await User.findById(id, '-password')

        if (!user) {
            return response.status(404).json({ msg: 'Usuário não encontrado' })
        }
        return response.status(200).json({ user })

    },


}
