<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";

    let birdData = [];
    let randomBird = null;
    let imageUrl = null;
    let loading = true;
    let options = [];
    let correctAnswer = "";
    let score = 0; // Punktestand
    let questionNumber = 1; // Zähler für die Frage
    const totalQuestions = 5; // Maximale Anzahl der Fragen auf 5 ändern
    let showPopover = false; // Für das Anzeigen der Popover-Nachricht
    let popoverMessage = ""; // Die Nachricht, die im Popover angezeigt wird
    let quizFinished = false; // Flag, ob das Quiz beendet ist
    let showModal = false; // Flag für das Anzeigen des Modals
    let selectedCountryName = ""; // Name des ausgewählten Landes
    let showCountrySelection = true; // Flag für die Länderübersicht

    let countries = [
        { name: "Deutschland", lat: 51.1657, lng: 10.4515, id: "DE" },
        { name: "Italien", lat: 41.8719, lng: 12.5674, id: "IT" },
        { name: "Spanien", lat: 40.4637, lng: -3.7492, id: "ES" },
        { name: "Japan", lat: 36.2048, lng: 138.2529, id: "JP" },
        { name: "Costa Rica", lat: 9.7489, lng: -83.7534, id: "CR" },
        { name: "USA", lat: 37.0902, lng: -95.7129, id: "US" },
    ];

    let selectedCountry = countries[0]; // Standardmäßig immer Deutschland
    let askedBirds = []; // Array, um bereits gestellte Vögel zu speichern

    async function fetchBirdData() {
        try {
            const response = await axios.get(
                "https://api.ebird.org/v2/data/obs/geo/recent",
                {
                    params: {
                        lat: selectedCountry.lat, // Dynamische Koordinaten
                        lng: selectedCountry.lng,
                        dist: 50,
                        back: 30,
                        maxResults: 100,
                    },
                    headers: {
                        "X-eBirdApiToken": "API_SCHLÜSSEL_HIER", // Dein API-Schlüssel
                    },
                },
            );
            birdData = response.data;
            console.log(response.data); // Gib die gesamte Antwort in der Konsole aus, um die Struktur zu überprüfen.

            selectRandomBird(); // Zuerst hier aufrufen, um einen zufälligen Vogel zu wählen
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
            alert(
                "Es gab ein Problem beim Abrufen der Vogeldaten. Bitte versuche es später erneut.",
            );
        }
    }

    // Funktion zum Abrufen des Bildes vom lokalen Backend-Server
    async function fetchImage(species) {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/obtain-image`,
                {
                    params: { species },
                },
            );
            imageUrl = response.data.imageUrl;
        } catch (error) {
            console.error("Fehler beim Abrufen des Bildes:", error);
            imageUrl = null;
        } finally {
            loading = false;
        }
    }

    // Zufälligen Vogel auswählen und Antwortmöglichkeiten generieren
    function selectRandomBird() {
        if (birdData.length > 0) {
            // Filtern der Vögel, die noch nicht gefragt wurden
            const availableBirds = birdData.filter(
                (bird) => !askedBirds.includes(bird.comName),
            );
            if (availableBirds.length > 0) {
                randomBird =
                    availableBirds[
                        Math.floor(Math.random() * availableBirds.length)
                    ];
                askedBirds.push(randomBird.comName); // Den Vogel in das bereits gestellte Array einfügen
                correctAnswer = randomBird.comName;
                generateOptions();
                fetchImage(randomBird.comName); // Hole das Bild für den Vogel
            }
        }
    }

    // 3 falsche Antworten zufällig generieren
    function generateOptions() {
        options = [correctAnswer];
        while (options.length < 4) {
            const randomOption =
                birdData[Math.floor(Math.random() * birdData.length)].comName;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }
        options = options.sort(() => Math.random() - 0.5); // Mischen der Optionen
        console.log("Antwortoptionen:", options); // Debug-Ausgabe
    }

    // Antwort überprüfen

    function checkAnswer(option) {
        if (option === correctAnswer) {
            score += 1; // Punktestand erhöhen
            popoverMessage = `Richtig!`; // Nur "Richtig" anzeigen
            showPopover = true;
        } else {
            popoverMessage = `Falsch! Der richtige Vogel war der ${correctAnswer}.`; // Zeige den richtigen Vogel an
            showPopover = true;
        }

        setTimeout(() => {
            showPopover = false; // Popover nach 3 Sekunden ausblenden
        }, 3000);

        if (questionNumber < totalQuestions) {
            questionNumber += 1; // Fragezähler erhöhen
            loading = true; // Bild neu laden
            selectRandomBird(); // Nächste Frage anzeigen
        } else {
            quizFinished = true; // Setze das Quiz als abgeschlossen
        }
    }

    // Funktion zum Neustarten des Quiz
    function restartQuiz() {
        score = 0; // Punktestand zurücksetzen
        questionNumber = 1; // Fragezähler zurücksetzen
        askedBirds = []; // Das Array für die bereits gestellten Vögel zurücksetzen
        quizFinished = false; // Quiz beenden
        fetchBirdData(); // Vogelbeobachtungsdaten neu laden
    }

    // Funktion zum Auswählen des Landes
    function selectCountry(country) {
        selectedCountry = country;
        selectedCountryName = country.name; // Setze den Namen des ausgewählten Landes
        fetchBirdData(); // Lade die Vogelbeobachtungsdaten für das ausgewählte Land
        showCountrySelection = false; // Länderübersicht ausblenden
        console.log("Land ausgewählt:", selectedCountry); // Debug-Ausgabe
    }

    // Funktion zum Anzeigen des Modals
    function showCountryModal(country) {
        selectedCountryName = country.name;
        showModal = true;
    }

    // Funktion zum Bestätigen des Modals
    function confirmCountrySelection() {
        showModal = false;
        selectCountry(countries.find((c) => c.name === selectedCountryName));
    }

    // Funktion zum Schließen des Modals
    function closeModal() {
        showModal = false;
    }

    // Funktion zum Zurückkehren zur Länderübersicht
    function backToCountrySelection() {
        showCountrySelection = true;
    }

    // Abrufen der Vogelbeobachtungsdaten beim Laden der Seite
    onMount(() => {
        initMap();
    });

    // Initialisiere die Karte
    function initMap() {
        const map = L.map("map").setView([20, 0], 2); // Weltkarte zentriert

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        countries.forEach((country) => {
            L.marker([country.lat, country.lng])
                .addTo(map)
                .bindPopup(country.name)
                .on("click", () => showCountryModal(country));
        });
    }
</script>

<h3>Vogel Quiz</h3>
<p>
    {#if showCountrySelection}Wähle ein Land, um das Quiz zu starten{:else}{/if}
</p>

{#if showCountrySelection}
    <div id="map" style="height: 500px; width: 100%;"></div>
    <!-- Karte größer und angepasst -->
{/if}

{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <p>
                Möchten Sie ein Vogelerkennungsquiz für {selectedCountryName} starten?
            </p>
            <button on:click={confirmCountrySelection}>Ja</button>
            <button on:click={closeModal}>Nein</button>
        </div>
    </div>
{/if}

{#if !showCountrySelection}
    <div class="quiz-container">
        {#if quizFinished}
            <div class="quiz-finished">
                <h4>Quiz abgeschlossen!</h4>
                <p>Dein Punktestand: {score} von {totalQuestions}</p>
                <button on:click={restartQuiz}>Erneut spielen</button>
            </div>
        {:else}
            <div class="question-info">
                <p>Frage {questionNumber} von {totalQuestions}</p>
                <p>Dein Punktestand: {score}</p>
            </div>

            <div class="question">
                <p>Welcher Vogel ist das?</p>
                {#if loading}
                    <p>Bild wird geladen...</p>
                {:else if imageUrl}
                    <div class="image-container">
                        <img
                            src={imageUrl}
                            alt={randomBird.comName}
                            class="bird-image"
                        />
                    </div>
                    <div class="options">
                        {#each options as option}
                            <button on:click={() => checkAnswer(option)}
                                >{option}</button
                            >
                        {/each}
                    </div>
                {:else}
                    <p>Bild konnte nicht geladen werden.</p>
                {/if}

                {#if showPopover}
                    <div class="popover">{popoverMessage}</div>
                {/if}
            </div>
        {/if}
    </div>
{/if}

<style>
    /* Allgemeine Layout-Anpassungen */

    .quiz-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: auto; /* Höhe automatisch anpassen */
        max-width: 900px; /* Maximale Breite verkleinern */
        width: 100%; /* Kachel bleibt flexibel */
        padding: 1.5rem; /* Reduziertes Padding */
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        margin: 0 auto;
    }

    h3 {
        font-size: 2rem;
        color: #131313; /* Weißer Text */
        margin-bottom: 1rem;
        text-align: center;
    }

    p {
        color: #131313; /* Weißer Text für die Nachricht "Wähle ein Land..." */
        font-size: 1rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    .question-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }

    .question {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .image-container {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        width: 100%;
    }

    /* Angepasste Größe der Vogelbilder */
    .bird-image {
        max-width: 50%; /* Maximale Breite auf 50% setzen */
        max-height: 200px; /* Maximale Höhe auf 200px setzen */
        height: auto;
        width: auto; /* Verhindert das Verzerren der Bilder */
        border-radius: 8px;
        object-fit: contain; /* Stellt sicher, dass das Bild korrekt skaliert wird */
    }

    .options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        width: 100%;
    }

    button {
        padding: 0.5rem; /* Größe der Buttons halbiert */
        font-size: 0.9rem;
        background-color: #ecf0f1;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-transform: capitalize;
        width: 100%;
    }

    button:hover {
        background-color: #1abc9c;
        color: white;
    }

    .popover {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(169, 169, 169, 0.8); /* Grauer Hintergrund */
        color: white;
        padding: 1.2rem;
        border-radius: 12px;
        font-size: 1.2rem;
        text-align: center;
        z-index: 10;
        animation: popUp 0.5s ease-in-out; /* Behalte die Animation */
        font-weight: normal; /* Schrift nicht fett */
    }

    /* Behalte die Animation */
    @keyframes popUp {
        0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.9);
        }
        50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.05);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
    }

    /* Modal Styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .modal-content button {
        margin: 0.5rem;
        padding: 1rem;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s ease;
    }

    .modal-content button:hover {
        background-color: #2980b9;
    }

    /* Map-Stile */
    #map {
        width: 100%;
        height: 500px;
    }

    /* Responsive Anpassungen */
    @media (max-width: 768px) {
        .quiz-container {
            padding: 1rem;
            max-width: 100%;
        }

        .options {
            grid-template-columns: 1fr;
        }
    }
</style>
