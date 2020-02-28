// const db = require('../database/dbConfig.js');
const server = require('../api/server.js');
const request = require('supertest');


describe('GET jokes', function () {
    it(' should get jokes', function() {
        expect(true).toBe(true);
    });

    describe('GET /api/jokes',  function(){
        it('should return 400 OK', function() {
            return request(server)
            .get('/api/jokes/')
            .then(res => {
            expect(res.status).toBe(400)
            }); 
        });
        
    })
})

describe('POST /register', () => {
    it('should return 200 OK', () => {
        return request(server).post('/api/auth/register').send({username:"subject23",password:"monte12"})
        .then(res => {
            expect(res.status).toBe(201);
        })
    })
    it('should return JSON data', () => {
        return request(server).post('/api/auth/register').send({username:"subject23",password:"monte12"}).then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})

