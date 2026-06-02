var mongoose = require('mongoose');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');
var Bicicleta = require ('../../models/bicicleta');

describe('Testing Usuarios', function(){
	beforeEach(function(done){
//		var mongoDB = 'mongodb://localhost/testdb';		
		var mongoDB = 'mongodb://localhost/redbicicletas';
//		mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
		mongoose.connect(mongoDB);

		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function(){
			console.log('Conectados...');
			done();
		});
	});

	afterEach(function(done){
		Reserva.deleteMany({}, function(err,success){
			if(err) console.log(err);
			Usuario.deleteMany({}, function(err,success){
				if(err) console.log(err);
				Bicicleta.deleteMany({}, function(err,success){
					if(err) console.log(err);
					done();
				});
			});
		});
	});

	describe('Cuando se reserva unabici', () =>{
		it(' Desde existir la reserva', (done) => {
			const usuario = new Usuario({nombre: 'Axel'});
			usuario.save();
			const bicicleta = new Bicicleta({code: 1, color: "rojo", modelo: "urbana",});
			bicicleta.save();

			var hoy = new Date();
			var manana = new Date();
			manana.setDate(hoy.getDate()+1);
			usuario.reservar(bicicleta.id,hoy,manana,function(err,reserva){
				Reserva.find({}).populate('Bicicleta').populate('Usuario').exec(function(err,reservas){
					console.log(reservas[0]);
					expect(reservas.length).toBe(1);
					expect(reservas[0].diasDeReserva()).toBe(2);
					//expect(reservas[0].bicicleta.code).toBe(1);
					//expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
					done();
				});
			});
		});
	});
});
