const connection = require('../database/connections') //Vai 'importar' as conexões que são, basicamente, o banco de dados

module.exports = {
    async create(req, res) {
        const { id } = req.body //Vai buscar o id de quem está tentando logar

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()

        if (!ong) {
            return res.status(400).json({ error: 'Login não permitido, essa ong não existe.' })
        }

        return res.json(ong)
    }
}