const express = require('express');
let router = express.Router();
const AdminRouter = require('./admin');
const WebRouter = require('./website');
const UploadRouter = require('./upload');
const CommonController = require('../controllers/CommonController');


//Admin Dashboard Api's
router.use('/admin', AdminRouter);

//Website Api's
router.use('/web', WebRouter);

//Upload Router
router.use('/upload', UploadRouter);

//Drop Total Database Except Admin
router.route('/Drop_All_Collections_Database').get(CommonController.Drop_All_Collections_Database);

module.exports = router;