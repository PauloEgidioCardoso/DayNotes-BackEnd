const senha = 'PnI676EYwbyw7uUe';

const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://usuario:PnI676EYwbyw7uUe@apicluster.ffrzk8o.mongodb.net/annotations?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;
