var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BicicletaSchema = new Schema({
    id: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
});

module.exports = mongoose.model('bicicleta', BicicletaSchema);
