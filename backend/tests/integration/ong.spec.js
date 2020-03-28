// o axios nao e recomendado para testes
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    // para rodar o knex e existir e garantir que existe um db test criado
    beforeEach(async () => {
        // zera o db de test antes de comecar para nao sobrecarregar de dados inuteis
        await connection.migrate.rollback();
        // roda as ultimas migracoes
        await connection.migrate.latest();
    });

    // para desconectar o banco de dados apos os testes
    // async porque pode levar um tempo para acontecer
    afterAll(async () => {
        await connection.destroy();
    })

    // como a funcao anterior eh async essa so comeca depois que aquela estiver pronta
    it('should be able to create a new ONG', async () => {
        // como e um requisicao http, precisamos aguardar finalizar para dai continuar
        // por isso informa que a function e asincrona
        // e informa qual requisicao ele precisa esperar usando await
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG Teste",
                email: "ong@ong.co.uk",
                whatsapp: "4407378113666",
                city: "Northampton",
                uf: "UK"
            });
        
        /*
        *
        *
        * USE .set('Authorization', 'id_value') entre o .post e o .send para informar um valor do header
        *
        * 
        */
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
    
});