var express = require('express');
var router = express.Router();
const { getHistory, editHistory, deleteHistory } = require('../controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('history');
});

router.get('/load', getHistory);

router.put('/', editHistory);

router.delete('/:id', deleteHistory);

module.exports = router;