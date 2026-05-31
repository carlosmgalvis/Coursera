var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    res.render('bicicletas/index', {bicis: Bicicleta.allBicis});
}

exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo, [req.body.lat, req.body.lng]);
    Bicicleta.add(bici);
    res.redirect('/bicicletas');
}

exports.bicicleta_update_get = function(req, res) {
    var bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update', {bici});
}

exports.bicicleta_update_post = function(req, res) {
    // Create an object with the updated data
    var updatedData = {
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    };
    
    // Use your model's built-in update function
    Bicicleta.updateById(req.params.id, updatedData);
    
    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeById(req.params.id);
    res.redirect('/bicicletas');
}