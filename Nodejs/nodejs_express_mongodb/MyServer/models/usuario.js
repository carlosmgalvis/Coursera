var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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


module.exports = mongoose.model('usuario', usuarioSchema);