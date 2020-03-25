const crypto = require('crypto') //Vai requerir/pegar o módulo crypto. Não, eu espero que ele não mate o SuperMan! Mas ela serve pra criptografia, e vai ajudar a criar o id da ONG

const connection = require('../database/connections') //Vai 'importar' tudo aquilo que foi exportado do connection 

module.exports = { //Vai exportar um objeto com várias funções
    async index(req, res) { //Essa primeira função vai listar as ongs
        const ongs = await connection('ongs').select('*') //Vai pegar tudo que estiver na tabelas ONGS (Para mais esclarecimentos olhe a nota da linha 19)

        return res.json(ongs) //Vai retornar como resposta a const ongs transformando ela em JSON
    },

    async create(req, res) { //Essa vai criar uma nova ong
        const { name, email, whatsapp, city, uf } = req.body; //Pegando a requisição que está dentro do body

        const id = crypto.randomBytes(4).toString('HEX') //Vai gerar 4 bytes aleatórios String Hexadecimal

        await connection('ongs').insert({  //Meu filho, vai lá na tabela 'ongs' que a gente pegou do knexfile.js. Que está no arquivo 'db.sqlite' e adiciona nela todas essas variáveis. Mas espera a requisição terminar!
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id }) //Vai retornar como resposta, esse objeto transformando ele em JSON
    }
}