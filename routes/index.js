var express = require('express');
var router = express.Router();
const { create } = require('../controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Weather Calculator' });
});

router.post('/', create)

module.exports = router;
