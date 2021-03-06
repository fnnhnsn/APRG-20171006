// Initialisierung des Webservers
const express = require('express');
const app = express();

// body-parser initialisieren
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// EJS Template Engine initialisieren
app.set('view engine', 'ejs');

//Initialisierung von tingodb
// Name der Collection festlegen
const DB_COLLECTION = "products"; 
// Leeren Ordner ./tingodb anlegen
require('fs').mkdir(__dirname + '/tingodb', (err)=>{});
// Datenbank initialisieren
const Db = require('tingodb')().Db;
const db = new Db(__dirname + '/tingodb', {});
const ObjectID = require('tingodb')().ObjectID;

// Webserver starten
// Aufruf im Browser: http://localhost:3000

app.listen(3000, function(){
	console.log("listening on 3000");
});

//Index Seite laden

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

//Datenbank speichern

app.post('/data', (request, response) => {
    const name = request.body.name;
    const password = request.body.password;

    const article = {'name': name, 'password': password};
    db.collection(DB_COLLECTION).save(article, (err, result) => {
        if (err) return console.log(err);
        
        console.log('Eintrag war erfolgreich!');
        response.redirect('/');
    });
});

// Auf Seite zum Einloggen weiterleiten

app.get('/einloggen', (request, response) => {
    response.sendFile(__dirname + '/einloggen.html');
});

// Vergleich der Daten

app.post('/logIn', (request, response) => {
    const login1 = request.body.login1;
    const login2 = request.body.login2;

    db.collection(DB_COLLECTION).findOne({'username': login1}, (error, result) => {
        console.Log(result);
    });
    db.collection(DB_COLLECTION).findOne({'password': login2}, (error, result2) => {
        console.Log(result2);
    });

    if(result != "" && result2 != "") {
        response.render('ausgabe', {
            'name': result,
            'passwort': result2, 
        });
    }
    else {
        response.render('fehler', {

        });
    };

});