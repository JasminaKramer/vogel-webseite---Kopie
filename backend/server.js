// backend/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());  // CORS aktivieren, um Anfragen von der Frontend-Domain zuzulassen

app.get("/api/obtain-image", async (req, res) => {
    const species = req.query.species;  // Vogelname aus der Anfrage holen

    try {
        const response = await axios.get('https://commons.wikimedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                list: 'search',
                srsearch: species,
                srnamespace: 6,  // Nur in Bildern suchen
            },
        });

        const imageTitle = response.data.query.search[0]?.title;
        if (imageTitle) {
            const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${imageTitle}`;
            res.json({ imageUrl });
        } else {
            res.status(404).json({ error: "Bild nicht gefunden" });
        }
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen des Bildes" });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Backend läuft auf http://localhost:${port}`);
});
