var mongoose = require('mongoose');
var Reserva = require('./reserva');
const saltRounds = 10;
var bcrypt = require('bcrypt');
const crypto = require('crypto');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator').default;
const Token = require('../models/token');
const mailer = require('../mailer/mails');

var validateEmail = function(email){
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	return re.test(email);
};

var usuarioSchema = new Schema({
	nombre: {
		type: String,
		trim: true,
		required: [true]
	},
	email: {
		type: String,
		trim: true,
		required: [true],
		unique: true,
		lowercase:true,
		validate: [validateEmail],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/]
	},
	password: {
		type: String,
		required: [true]
	},
	passwordResetToken: String,
	passwordResetTokenExpires: Date,
	verificado:{
		type: Boolean,
		default: false
	},
	googleId:String,
	facebookId: String
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.methods.reservar = function(biciId,desde,hasta,cb){
	var reserva = new Reserva({usuario: this.id, bicicleta: biciId, desde: desde, hasta: hasta});
	console.log(reserva);
	reserva.save(cb);
}

usuarioSchema.pre('save', function(next){
	if(this.isModified('password')){
		this.password = bcrypt.hashSync(this.password,saltRounds);
	}
	next();
});

usuarioSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

usuarioSchema.methods.enviar_email_bienvenida = function(cb){
	const token = new Token({_userId: this.id, token:crypto.randomBytes(16).toString('hex')});
	const email_destination = this.email;
	token.save(function(err){
		if(err) return console.log(err.message);
		console.log('Token del usuario '+token.token);
		const mailOptions = {
			from:'no-reply@redbicicletas.com',
			to: email_destination,
			subject: 'verificacion de cuenta',
			text: 'Hola, Por favor para verificar su cuenta haga click en este enlace: \n'+'http://localhost:3000/token/confirmation/'+token.token
		};

		mailer.sendMail(mailOptions, function(err){
			if(err) return console.log(err.message);
			console.log('Se ha enviado un mail de verificacion a: '+ email_destination);
		});
	});
}

usuarioSchema.methods.resetPassword = function (cb) {
	const token = new Token({_userId: this._id, token: crypto.randomBytes(16).toString("hex")});
	const email_destination = this.email;
	token.save(function(err){
		if (err) return console.log(err.message);
		const mailOptions = {
			from: "no-reply@redbicicletas.com",
			to: email_destination,
			subject: "Reseteo de password de cuenta",
			html:
				'Hola, por favor gaga click en el enlace \n'+'http://localhost:3000/resetPassword/' + token.token + ' para resetear su contraseña.'
		};
		mailer.sendMail(mailOptions, (err) => {
			if (err) return console.log(err.message);
			console.log("Se envio un email para resetear la contraseña a " + email_destination);
		});
	});
};

usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(condition, callback){
	const self = this;
	console.log(condition);
	self.findOne({
		$or:[
			{'googleId': condition.id},{'email': condition.emails[0].value}
		]}, (err,result) => {
			if(result){
				callback(err,result);
			} else {
				console.log('Condition');
				console.log(condition);
				let values = {};
				values.googleId = condition.id;
				values.email = condition.emails[0].value;
				values.nombre = condition.displayName || 'SIN NOMBRE';
				values.verificado = true;
				values.password = condition._json.etag;
				console.log('VALUES');
				console.log(values);
				self.create(values, (err,result) => {
					if(err) { console.log(err); }
					return callback(err,result)
				});
			}
		}
	)
}

usuarioSchema.statics.findOneOrCreateByFacebook = function findOneOrCreate(condition, callback){
	const self = this;
	console.log(condition);
	self.findOne({
		$or:[
			{'facebookId': condition.id},{'email': condition.emails[0].value}
		]}, (err,result) => {
			if(result){
				callback(err,result);
			} else {
				console.log('Condition');
				console.log(condition);
				let values = {};
				values.facebookId = condition.id;
				values.email = condition.emails[0].value;
				values.nombre = condition.displayName || 'SIN NOMBRE';
				values.verificado = true;
				values.password = crypto.randomBytes(16).toString('hex');
				console.log('VALUES');
				console.log(values);
				self.create(values, (err,result) => {
					if(err) { console.log(err); }
					return callback(err,result)
				});
			}
		}
	)
}

module.exports = mongoose.model('Usuario', usuarioSchema);