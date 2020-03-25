exports.up = function (knex) { //Pistola hipnótica, péi! Agola você vai fazel tudo o que eu mandal
    return knex.schema.createTable('ongs', function (table) { //Crie uma tabela 'ongs'
        table.string('id').primary(); //Crie uma coluna que vai armazenar uma string que vai ser o ID e vai ser primária
        table.string('name').notNullable(); //Crie uma coluna com o nome, que vai ser obrigatótia
        table.string('email').notNullable(); //Crie uma coluna com o email, que vai ser obrigatótia
        table.string('whatsapp').notNullable(); //Crie uma coluna com o whatsapp, que vai ser obrigatótia
        table.string('city').notNullable(); //Crie uma coluna com o nome da cidade, que vai ser obrigatótia
        table.string('uf', 2).notNullable(); //Crie uma coluna com a UF do estado, que vai ter somente dois caracteres e que vai ser obrigatótia
    })
};

exports.down = function (knex) { //Deu problema, oq eu faço?
    return knex.schema.dropTable('ongs') //Deleta aquela coluna
};
