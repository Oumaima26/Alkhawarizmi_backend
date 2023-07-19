//chargement de module
// Importez toutes les dépendances et middleware ici 
//express est un backend framework pour simplifier et manipuler des routes
const express = require('express');
//cors partage des ressources entre origines multiples (ki tabda 3andek code 2 version jey men zouz blayes)
const cors = require('cors');
//Mongoose :facilitant les interactions entre base de données et serveur
const mongoose = require('mongoose');

//ki ta3mel submit fel github dotenv yen7i el code eli ma t7eb 7ad ychoufou
require('dotenv').config();

//On définit notre objet express nommé app

// Lancez une application express. 
const app = express();
//body-parser est un middleware ( middleware ye5dem fi wost el route : ba3ed el request ou 9bal el response) pour fetcher les donnee du body 

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

app.use(cors());
app.use(express.json());

  // DB Config

const uri = require("./conf/keys").mongoURI;

  // Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

  //routes
const userRouter = require('./routes/user');
app.use('/user', userRouter);

const pupilRouter = require('./routes/pupil');
app.use('/pupil', pupilRouter);

const noteRouter = require('./routes/note');
app.use('/note', noteRouter);

const subjectRouter = require('./routes/subject');
app.use('/subject', subjectRouter);


const timetableRouter = require('./routes/timetable');
app.use('/timetable', timetableRouter);

const timetablepupilRouter = require('./routes/timetablepupil');
app.use('/timetablepupil', timetablepupilRouter);

//Définition et mise en place du port d'écoute
// Démarrez le serveur ici 

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
