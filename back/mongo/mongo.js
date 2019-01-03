var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient
var url = 'mongodb://localhost:27017';
var objectId = mongodb.ObjectID;

function getId(id) {
    if (id && typeof id == "string") {
        return objectId(id)
    }
}

function connects(fn) {
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            return fn && fn(err)
        }
        var db = con.db('page');
        var collection = db.collection('page')
        fn && fn(null, collection, con)
    })
}

module.exports = {
    getId: getId,
    connects: connects
}