var Bicicleta = require('../../models/bicicleta');

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