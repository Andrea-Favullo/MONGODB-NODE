var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@cluster0.dnkc2.mongodb.net/Cluster0?retryWrites=true&w=majority"

//ricerca di un film usand il titolo
router.get('/movie_from_title/:title', function (req, res, next) {
    title = req.params.title;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(getMovieFromTitle);
    function getMovieFromTitle(err) {
        if (err) Console.log("Connessione al DB non risucita");
        else {
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({ 'title': `${title}` }).toArray(queryResults);
        }
    }
    function queryResults(err, result) {
        if (err) console.log(err.message);
        else res.send(result);
        client.close();
    }
});

//ricerca di un film usand il titolo
router.get('/list/', function (req, res, next) {
    //stringa di connessione al db
    const uri = "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@cluster0.dnkc2.mongodb.net/Cluster0?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        // mi connetto alla collection movies
        const collection = client.db("sample_mflix").collection("movies");
        // prendo num film dalla collection
        collection.find().limit(10).toArray((err, result) => {
            //Se c'è qualche errore lo stampo
            if (err) console.log(err.message);
            else res.send(result);
            //Quando ho terminato la find chiudo la sessione con il db
            client.close();
        });
        //Eseguo la query e passo una funzione di callback
    });
});
router.get('/list/:num', function (req, res, next) {
    //Leggo i parametri passati all'url
    console.log(req.params);
    let num = parseInt(req.params.num);
    //stringa di connessione al db
    const uri = "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@cluster0.dnkc2.mongodb.net/Cluster0?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        // mi connetto alla collection movies
        const collection = client.db("sample_mflix").collection("movies");
        // prendo num film dalla collection
        if (num > 0) {
            collection.find().limit(num).toArray((err, result) => {
                //Se c'è qualche errore lo stampo
                if (err) console.log(err.message);
                else res.send(result);
                //Quando ho terminato la find chiudo la sessione con il db
                client.close();
            });
        } else {
            res.send("0 film restituiti")
        }
        //Eseguo la query e passo una funzione di callback
    });
});

//ricerca di un film in base all'anno
router.get('/year/:year', function (req, res, next) {
    //Leggo i parametri passati all'url
    console.log(req.params);
    let year = parseInt(req.params.year);
    //stringa di connessione al db
    const uri = "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@cluster0.dnkc2.mongodb.net/Cluster0?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        // mi connetto alla collection movies
        const collection = client.db("sample_mflix").collection("movies");
        // prendo num film dalla collection
        collection.find({ 'year': year }).toArray((err, result) => {
            //Se c'è qualche errore lo stampo
            if (err) console.log(err.message);
            else res.send(result);
            //Quando ho terminato la find chiudo la sessione con il db
            client.close();
        });
        //Eseguo la query e passo una funzione di callback
    });
});

//ricerca di un film in base alla valutazione
router.get('/rating/:rate', function (req, res, next) {
    //Leggo i parametri passati all'url
    console.log(req.params);
    let rate = parseInt(req.params.rate);
    //stringa di connessione al db
    const uri = "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@cluster0.dnkc2.mongodb.net/Cluster0?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        // mi connetto alla collection movies
        const collection = client.db("sample_mflix").collection("movies");
        // prendo num film dalla collection
        collection.find({ 'metacritic': rate }).toArray((err, result) => {
            //Se c'è qualche errore lo stampo
            if (err) console.log(err.message);
            else res.send(result);
            //Quando ho terminato la find chiudo la sessione con il db
            client.close();
        });
        //Eseguo la query e passo una funzione di callback
    });
});

module.exports = router;