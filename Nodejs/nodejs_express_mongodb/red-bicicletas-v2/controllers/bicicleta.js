var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = async function(req, res) {
    try {
        // Query the actual MongoDB collection using Mongoose
        const bicis = await Bicicleta.find({});
        res.render('bicicletas/index', { bicis: bicis });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = async function(req, res) {
    try {
        // Construct the document as a single layout object
        var nuevaBici = new Bicicleta({
            id: req.body.id,
            color: req.body.color,
            modelo: req.body.modelo,
            ubicacion: [req.body.lat, req.body.lng]
        });

        await nuevaBici.save(); // Save directly to MongoDB
        res.redirect('/bicicletas');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.bicicleta_update_get = async function(req, res) {
    try {
        const bici = await Bicicleta.findOne({ id: req.params.id });
        res.render('bicicletas/update', { bici: bici });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.bicicleta_update_post = async function(req, res) {
    try {
        await Bicicleta.updateOne({ id: req.params.id }, {
            color: req.body.color,
            modelo: req.body.modelo,
            ubicacion: [req.body.lat, req.body.lng]
        });
        res.redirect('/bicicletas');
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.bicicleta_delete_post = async function(req, res) {
    try {
        await Bicicleta.deleteOne({ id: req.params.id });
        res.redirect('/bicicletas');
    } catch (err) {
        res.status(500).send(err.message);
    }
};