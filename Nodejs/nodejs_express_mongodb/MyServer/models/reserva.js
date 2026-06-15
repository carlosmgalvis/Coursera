var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var reservaSchema = new Schema({
	desde: Date,
	hasta: Date,
	bicicleta: { type: mongoose.Schema.Types.ObjectId, ref: 'bicicleta'},
	usuario: { type: mongoose.Schema.Types.ObjectId, ref:'usuario'}
});


module.exports = mongoose.model('reserva', reservaSchema);