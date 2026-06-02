var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200',() => {
            expect(Bicicleta.allBicis.length).toBe(3);
            var a = new Bicicleta(1, 'rojo', 'urbana',[-34.5, -54.1]);
            Bicicleta.add(a);
            request.get('http://localhost:3000/api/bicicletas', function (error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });
});

describe('POST BICICLETAS /create', () => {
    it('Status 200',(done) => {
        var headers = {'content-type' : 'application/json'};
        var a = '{"id": 1, "color": "rojo", "modelo": "urbana", "lat": -34.5, "lng": -54.1}';
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: aBici
        }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            var bici = JSON.parse(body).bicicleta;
            expect(bici.color).toBe('rojo');
            expect(bici.modelo).toBe('urbana');
            done();
        });
    });
});
/*

describe('Bicicleta API', () => {
    beforeEach(() => {
        Bicicleta.allBicis = [];
    });
});

describe('GET Bicicletas /api/bicicletas', () => {
    it('debe devolver todas las bicicletas', (done) => {
        request.get('http://localhost:3000/api/bicicletas', (error, response, body) => {
            var result = JSON.parse(body);
            expect(response.statusCode).toBe(200);
            expect(result.bicicletas.length).toBe(0);
            done();
        });
    });
});

*/