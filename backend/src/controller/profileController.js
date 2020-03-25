const connection = require('../database/connections') //Vai 'importar' as conexões que são, basicamente, o banco de dados

module.exports = {
    async index(req, res) {
        const ong_id = req.headers.authorization; //Vai pegar o id da ong

        const incidents = await connection('incidents') //No banco de dado dos casos
            .where('ong_id', ong_id) //Nos casos em que essa ong tiver criado
            .select('*') //Selecione todos

        return res.json(incidents); //Retorne esses casos
    }
}