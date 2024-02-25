const mongoose = require('mongoose');

//change environments to get .env
const user = 'usuario';
const password = 'PnI676EYwbyw7uUe';

const dbConfig = `mongodb+srv://${user}:${password}@apicluster.ffrzk8o.mongodb.net/annotations?retryWrites=true&w=majority`;

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados:', err);
});

module.exports = connection;
