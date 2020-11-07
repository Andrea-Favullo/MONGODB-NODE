var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

//ricerca di un film in base all'attore
router.get('/actors/:actor', function (req, res, next) {
    //Leggo i parametri passati all'url
    console.log(req.params);
    actor = req.params.actor;
    //stringa di connessione al db
    const uri = "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@cluster0.dnkc2.mongodb.net/Cluster0?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        // mi connetto alla collection movies
        const collection = client.db("sample_mflix").collection("movies");
        // trovo il film nella collection
        collection.find({ 'cast': actor }).toArray((err, result) => {
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