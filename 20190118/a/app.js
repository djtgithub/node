const MongoClient = require('mongodb').MongoClient;
const Server = require("mongodb").Server;
const mongo = new MongoClient();
var myDB = null;
var DB=null;
MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
	DB = db;
    myDB = db.db('words'); //连接words数据库
    myDB.collection('word_stats', function(err, collection) { //连接word_stats数据表
        console.log("Before inserting");
        showDocs(collection, addSelfie);
    });
});


function showDocs(collection, callback) {
    var query = {
        'category': 'New'
    }
    collection.find(query, function(err, items) {
        items.toArray(function(err, itemsArr) {
            for (var i in itemsArr) {
                console.log(itemsArr[i])
            }
            callback(collection)
        });
    });
}


function addSelfie(collection) {
    var selfie = {
        word: 'selfie',
        first: 's',
        last: 'e',
        size: 4,
        stats: {
            vowels: 3,
            consonants: 3,
        },
        charsts: [{
            type: 'consonants',
            chars: ['s', 'l', 'f']
        }, {
            type: 'vowels',
            chars: ['e', 'i']
        }],
        category: 'New'
    };


    var options = {
        w: 1,
        wtimeout: 5000,
        journal: true,
        fsync: false
    }

    collection.insert(selfie, options, function(err, results) {
        console.log("\nInserting one Results：\n");
        console.log(results);
        console.log("\nafter inserting one:");
        showDocs(collection, addGoogleAndTweet)
    })
}


function addGoogleAndTweet(collection){
	var tweet = {
        word: 'tweet',
        first: 't',
        last: 't',
        size: 4,
        letters: ['t', 'w', 'e'],
        stats: {
            vowels: 3,
            consonants: 3,
        },
        charsts: [{
            type: 'consonants',
            chars: ['s', 'l', 'f']
        }, {
            type: 'vowels',
            chars: ['e', 'i']
        }],
        category: 'New'
    };
    var google = {
        word: 'google',
        first: 't',
        last: 't',
        size: 4,
        letters: ['t', 'w', 'e'],
        stats: {
            vowels: 3,
            consonants: 3,
        },
        charsts: [{
            type: 'consonants',
            chars: ['s', 'l', 'f']
        }, {
            type: 'vowels',
            chars: ['e', 'i']
        }],
        category: 'New'
    };

    var options = {
    	w: 1,
        wtimeout: 5000,
        journal: true,
        fsync: false
    }

    collection.insert([google,tweet], options, function(err, results) {
        console.log("\nInserting one Results：\n");
        console.log(results);
        console.log("\nafter inserting one:");
        showDocs(collection, closeDB);
    })

}

function closeDB(collection){
	// alert
	DB.close();
}