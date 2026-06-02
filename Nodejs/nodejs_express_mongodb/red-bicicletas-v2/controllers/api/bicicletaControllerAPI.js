var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicleta_create = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    });
}   

exports.bicicleta_delete = function(req, res) {
    try {
        Bicicleta.removeById(req.body.id);      
        res.status(204).send();
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

exports.bicicleta_update = function(req, res) {
    try {
        var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
        bici.ubicacion = [req.body.lat, req.body.lng];
        Bicicleta.updateById(req.body.id, bici);
        res.status(200).json({
            bicicleta: bici
        });
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}
