const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Créez une application Express
const app = express();
app.use(cors({
    origin: '*',
    allowedHeaders: '*'
}));
app.use((req, res, next) => {
    // Autoriser l'accès depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Autoriser les en-têtes spécifiques
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Autoriser les méthodes HTTP spécifiques
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});

// Port du serveur
const port = 3000;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://hugolamothe33:service@cluster0.k8xojnl.mongodb.net/film', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Schéma de données
const MyDataSchema = new mongoose.Schema({
    idFilm: Number,
    like: Boolean,
});

// Modèle de données
const MyDataModel = mongoose.model('MyData', MyDataSchema);

// Middleware pour parser le JSON
app.use(express.json());

// Route pour créer une nouvelle donnée
app.post('/film', (req, res) => {
    const { idFilm, like } = req.body;
    // Créer une nouvelle instance du modèle avec les données reçues
    const newData = new MyDataModel({ idFilm, like });

    // Enregistrer la nouvelle donnée dans la base de données
    newData.save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while saving the data' });
        });
});

app.put('/film', (req, res) => {
    const { idFilm } = req.body;

    // Créer une nouvelle instance du modèle avec les données reçues
    MyDataModel.findOne({"idFilm": idFilm})
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: 'Data not found' });
            }

            // Mettre à jour les propriétés de la donnée
            data.like = !data.like;

            // Enregistrer les modifications dans la base de données
            data.save()
                .then((updatedData) => {
                    res.json(updatedData);
                })
                .catch((error) => {
                    res.status(500).json({ error: 'An error occurred while updating the data' });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while searching for the data' });
        });
});

app.get('/film', (req, res) => {
    const { idFilm } = req.body;
    console.log(idFilm)
    // Créer une nouvelle instance du modèle avec les données reçues
    MyDataModel.findOne({"idFilm": idFilm})
        .then((data) => {
            res.json(data)
            console.log(data)
            return data;
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while searching for the data' });
        });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});