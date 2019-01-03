var express = require('express');
var router = express.Router();
var mongodb = require('../mongo/mongo.js')
    //console.log(mongodb)
    /* GET home page. */
router.get('/api/get/list', function(req, res, next) {
    var parse = req.query,
        page = parse.page,
        page_size = parse.page_size * 1,
        type = parse.type;
    //console.log(parse)
    mongodb.connects(function(err, cols, db) {
        if (err) {
            res.json({
                code: 0,
                mes: err
            })
        } else {
            var skipNum = (page - 1) * page_size;
            //console.log(page, page_size, type, skipNum)
            //console.log(cols)
            cols.find({ type: type }).skip(skipNum).limit(page_size).toArray(function(error, result) {
                db.close()
                if (error) {
                    res.json({
                        code: 0,
                        mes: error
                    })
                } else {
                    res.json({
                        code: 1,
                        data: result
                    })
                }
            })
        }

    })
});

module.exports = router;