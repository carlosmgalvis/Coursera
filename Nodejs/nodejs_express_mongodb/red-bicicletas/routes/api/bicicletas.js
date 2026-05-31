var express = require('express');
var router = express.Router();

var bicicletaControllerAPI = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', bicicletaControllerAPI.bicicleta_list);
router.post('/create', bicicletaControllerAPI.bicicleta_create);
router.delete('/delete', bicicletaControllerAPI.bicicleta_delete);
router.put('/update', bicicletaControllerAPI.bicicleta_update);

module.exports = router;