var express = require('express');
var router = express.Router();

//Importo la libreria mongodb
const MongoClient = require('mongodb').MongoClient;

//ricerca di un film usand il titolo
router.get('/movie_from_title/:title', function (req, res, next) {
    //Leggo i parametri passati all'url
    console.log(req.params);
    title = req.params.title;
    //stringa di connessione al db
    const uri = "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@cluster0.dnkc2.mongodb.net/Cluster0?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        // mi connetto alla collection movies
        const collection = client.db("sample_mflix").collection("movies");
        // trovo il film nella collection
        collection.find({ 'title': `${title}` }).toArray((err, result) => {
            //Se c'è qualche errore lo stampo
            if (err) console.log(err.message);
            else res.send(result);
            //Quando ho terminato la find chiudo la sessione con il db
            client.close();
        }); 
        //Eseguo la query e passo una funzione di callback
    });
});

//ricerca di un film usand il titolo
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
        if (num>0){
            collection.find().limit(num).toArray((err, result) => {
                //Se c'è qualche errore lo stampo
                if (err) console.log(err.message);
                else res.send(result);
                //Quando ho terminato la find chiudo la sessione con il db
                client.close();
            });
        }else{
            res.send("0 film restituiti")
        }
        //Eseguo la query e passo una funzione di callback
    });
});
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

module.exports = router;