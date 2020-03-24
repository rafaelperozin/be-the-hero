const crypto = require('crypto');
const connection = require('../database/connection');

// use async para retornar somente apos o insert for encerrado
module.exports = {
    async index(request, response) {
        // usando js para fazer a query, porque se mudar de banco de dados nao preciso alterar aqui.
        // poderia ser SELECT * FROM ongs
        // vai retornar um array
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    async create(request, response) {
        // especificar os campos por seguranca, para nao receber coisas aleatorias
        const {
            name,
            email,
            whatsapp,
            city,
            uf
        } = request.body;

        // criar o id da ong
        // texto (4 bytes) de caracteres aleatorio e converte em uma string do tipo hexadecimal alfanumerica
        const id = crypto.randomBytes(4).toString('HEX');

        // conectar ao db e cadastrar o dados
        // espera terminar essa funcao para dai continuar
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({
            id
        });
    }
};