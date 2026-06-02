var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function() {

    beforeEach(function(done) {
//		var mongoDB = 'mongodb://localhost/testdb';	        
        var mongoDB = 'mongodb://localhost/redbicicletas';
        //mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connect(mongoDB);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            mongoose.disconnect(err => {
                if (err) console.log(err);
                done();
            });
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de bicicleta', () => {
            var bici = Bicicleta.createInstance(1, 'rojo', 'urbana', [-34.5, -54.1]);
            expect(bici.id).toBe(1);
            expect(bici.color).toBe('rojo');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        }) 
    });   
    
    describe('Bicicleta.allBicis', () => {
        it('comienza vacía', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
    
    describe('Bicicleta.add', () => {
        it('agrega una bicicleta', (done) => {
            var bici = new Bicicleta({id: 1, color: 'rojo', modelo: 'urbana'});
            Bicicleta.add(bici, function(err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].id).toBe(bici.id);
                    expect(bicis[0].color).toBe(bici.color);
                    expect(bicis[0].modelo).toBe(bici.modelo);
                    done();
                });
            });
        });
    }); 
    
    Describe('Bicicleta.findById', () => {
        it('debe devolver la bicicleta con id 1', (done) => {
            var bici = new Bicicleta({id: 1, color: 'rojo', modelo: 'urbana'});
            Bicicleta.add(bici, function(err, newBici) {
                if (err) console.log(err);
                Bicicleta.findById(1, function(err, targetBici) {
                    expect(targetBici.id).toBe(bici.id);
                    expect(targetBici.color).toBe(bici.color);
                    expect(targetBici.modelo).toBe(bici.modelo);
                    done();
                });
            });
        });
        it('debe devolver null si no existe la bicicleta', (done) => {
            Bicicleta.findById(999, function(err, targetBici) {
                expect(targetBici).toBeNull();
                done();
            });
        }); 
    });
    
    describe('Bicicleta.removeById', () => {
        it('debe eliminar la bicicleta con id 1', (done) => {
            var bici = new Bicicleta({id: 1, color: 'rojo', modelo: 'urbana'});
            Bicicleta.add(bici, function(err, newBici) {
                if (err) console.log(err);
                Bicicleta.removeById(1, function(err, response) {
                    if (err) console.log(err);
                    Bicicleta.allBicis(function(err, bicis) {
                        expect(bicis.length).toBe(0);
                        done();
                    });
                });
            });
        });
    });
    
    Describe('Bicicleta.updateById', () => {
        it('debe actualizar la bicicleta con id 1', (done) => {
            var bici = new Bicicleta({id: 1, color: 'rojo', modelo: 'urbana'}); 
            Bicicleta.add(bici, function(err, newBici) {
                if (err) console.log(err);
                var updatedBici = new Bicicleta({id: 1, color: 'verde', modelo: 'montaña'});
                Bicicleta.updateById(1, updatedBici, function(err, response) {
                    if (err) console.log(err);
                    Bicicleta.findById(1, function(err, targetBici) {
                        expect(targetBici.id).toBe(updatedBici.id);
                        expect(targetBici.color).toBe(updatedBici.color);
                        expect(targetBici.modelo).toBe(updatedBici.modelo);
                        done();
                    });
                });
            });
        }); 
    });

});

/*
beforeEach(() => {
    Bicicleta.allBicis = [];
});

describe('Bicicleta.allBicis', () => {
    it('comienza vacía', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agrega una bicicleta', () => {
        var bici = new Bicicleta(1, 'rojo', 'urbana');
        Bicicleta.add(bici);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(bici);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bicicleta con id 1', () => {
        expect(Bicicleta.findById(1)).toBe(Bicicleta.allBicis[0]);
    });
    it('debe devolver undefined si no existe la bicicleta', () => {
        expect(Bicicleta.findById(999)).toBeUndefined();
    });
});

describe('Bicicleta.removeById', () => {
    it('debe eliminar la bicicleta con id 1', () => {
        Bicicleta.removeById(1);
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});
*/