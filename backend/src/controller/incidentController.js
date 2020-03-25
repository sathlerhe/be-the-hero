const connection = require('../database/connections') //Vai 'importar' as conexões que são, basicamente, o banco de dados

module.exports = { //Vai exportar um objeto com várias funções
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count() //Vai contar quantos casos tem registrados

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) //Vai deixar um limite de 5/pag
            .offset((page - 1) * 5) //A cada 5 registros ele vai pular uma pag
            .select([ //Vai armazenar tudo que estiver dentro da tabela 'incidents'
                'incidents.*',
                'ongs.name', 'ongs.city',
                'ongs.uf',
                'ongs.whatsapp',
                'ongs.email'
            ])

        res.header('X-Total-Count', count['count(*)']) //Vai retornar no cabeçalho da resposta o total de incidentes/casos

        return res.json(incidents)
    },

    async create(req, res) { //Essa vai servir pra criar um novo caso {Incident}
        const { title, description, value } = req.body //Vai pegar no corpo da requisição essas variáveis
        const ong_id = req.headers.authorization //Vai pegar o id da ong lá no cabeçalho (headers) na authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await connection('incidents') //Na tabela 'incidents'
            .where('id', id) //Vai ver aonde está a coluna com o id igual ao id do cao selecionado para deletar
            .select('ong_id') //Vai selecionar o id da ong
            .first() //E vai pegar o primeiro

        if (incident.ong_id !== ong_id) { //Se o id da ong que estiver querendo deletar for diferente do id da ong que tem o caso que será deletado
            return res.status(401).json({ error: 'Operation not permitted (Operação não permitida)' }) //Vai retornar como resposta o status 401, com a mensagem de erro
        }

        await connection('incidents').where('id', id).delete(); //Caso ele não passe por aquele IF 

        return res.status(204).send()
    }

}