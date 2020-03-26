const knex = require("knex"); //KNEX vem aqui agora!!
const configuration = require("../../knexfile"); //Vai pegar o arquivo knexfile.js [Esse require é como se fosse o import do ECMASCRIPT, só que pro node.js]

const connection = knex(configuration.development); //Vai armazenar a conexão de 'development' do knexfile

module.exports = connection; //Vai exportar a const connection pra aonde a vida levar ela
