Vogelerkennungs-Quiz  

Überblick

Das Vogelerkennungs-Quiz ist eine interaktive Webanwendung, die es den Benutzern ermöglicht, ihr Wissen über verschiedene Vogelarten zu testen. Die Anwendung zieht Daten von der eBird-API, um Informationen zu aktuellen Vogelbeobachtungen anzuzeigen und stellt den Benutzern zufällige Quizfragen zur Identifizierung von Vögeln. Das Quiz ist länderspezifisch, sodass Benutzer ein Land auswählen können, um Vogelarten aus diesem Land zu erraten.

Features
Vogelerkennungs-Quiz: Benutzer sehen ein Bild eines Vogels und wählen aus vier Antwortmöglichkeiten die richtige Vogelart aus.
Länderauswahl: Der Benutzer kann ein Land auswählen, um Fragen basierend auf Vogelarten dieses Landes zu beantworten.
Punktestand: Es wird ein Punktestand geführt, basierend auf den richtigen Antworten der Benutzer.
Interaktive Karte: Eine Karte wird angezeigt, auf der Benutzer Länder auswählen können, um das Quiz zu starten.
Technologien:
eBird API für Vogelbeobachtungsdaten
Leaflet für die interaktive Kartenanzeige
Svelte für die Benutzeroberfläche
Axios für Bild API-Anfragen

Funktionsweise
Vogelbeobachtungen: Die Anwendung verwendet die eBird API, um aktuelle Vogelbeobachtungen in verschiedenen Ländern abzurufen. Dies wird verwendet, um Vögel auszuwählen, die im Quiz angezeigt werden.

Bildanzeige: Für jedes Vogelbild wird eine Anfrage an ein Backend (lokal bei localhost:5000) gesendet, das das Bild für die jeweilige Vogelart bereitstellt.

Interaktive Karte: Die Benutzer können auf eine Weltkarte klicken, um ein Land auszuwählen. Basierend auf dem Land werden Vogelarten aus der Region angezeigt.

Struktur
HTML: Grundstruktur für die Website und die Anzeige der Quizfragen.
CSS: Responsives Design und Styles für die Quizansicht, Karte und Modals.
JavaScript (Svelte): Logik zur Auswahl der Vogelarten, zum Abrufen von Vogelbeobachtungsdaten und zur Verwaltung des Quiz.
Dateien
index.html: Die Haupt-HTML-Datei der Anwendung.
app.svelte: Die Svelte-Komponente für das Quiz und die Benutzeroberfläche.
styles.css: Alle relevanten Styles für das Layout und die Benutzererfahrung.
script.js: Enthält die Logik zur Verwaltung des Quiz, das Abrufen von Vogelbeobachtungsdaten und die Interaktionen.
API-Schlüssel
Die Anwendung verwendet die eBird API, für die du einen eigenen API-Schlüssel benötigst. 

javascript

"X-eBirdApiToken": "<dein-api-schlüssel>"
