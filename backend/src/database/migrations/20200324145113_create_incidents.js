
exports.up = function (knex) { //Bem dormido, bem dormido! Você vai fazer tudo o que eu mandar

    return knex.schema.createTable('incidents', function (table) { //Crie a tabela 'incidents' 
        table.increments() //A cada vez que um caso for criado adicione o seu id crescente (1, 2, ...)
        table.string('title').notNullable(); //Crie uma coluna com o título, que vai ser obrigatótia
        table.string('description').notNullable(); //Crie uma coluna com a descrição, que vai ser obrigatótia
        table.decimal('value').notNullable(); //Crie uma coluna com o valor que será gasto, a qual irá ser obrigatótia

        table.string('ong_id').notNullable() //Veja qual foi a ong que criou o caso pelo id dela

        table.foreign('ong_id').references('id').inTable('ongs') //A coluna 'ong_id' deve estar fazendo referência a coluna 'id' na tabela 'ongs'
    })
};

exports.down = function (knex) { //Ferrou, oq eu faço?
    return knex.schema.dropTable('incidents') //Deleta aquela coluna, vamos. Não pode ter problemas
};
