<!-- MethodenSection.svelte -->
<script>
    export let heading = "Methoden der Vogelerkennung";
    export let methods = [
        {
            title: "Visuelle Identifikation",
            description: `
                Diese Methode umfasst die
                Beobachtung von Vögeln vor Ort und ihre Identifizierung anhand von
                Merkmalen wie Größe, Farbe, Form und Verhalten. Traditionell wird
                diese Methode von Ornithologen und Vogelbeobachtern genutzt.`,
        },
        {
            title: "Akustische Identifikation",
            description: `
                Vogellieder und -rufe
                spielen eine wichtige Rolle bei der Identifizierung von Vögeln. Besonders
                schwer zugängliche Vogelarten können häufig nur durch ihre Rufe erkannt
                werden.`,
        },
        {
            title: "Technologie und KI",
            description: `
                Mit der Entwicklung von Smartphone-Apps
                und KI-gestützten Technologien wie der Vogelstimmen-Erkennung oder
                Bilderkennung kann die Vogelerkennung immer präziser und zugänglicher
                werden. Diese Technologien analysieren automatisch Bilder oder Aufnahmen
                und schlagen die wahrscheinliche Vogelart vor.`,
        },
        {
            title: "Genetische Identifikation",
            description: `
                In manchen Fällen wird
                auch die genetische Analyse verwendet, um Vögel anhand ihrer DNA
                zu bestimmen. Diese Methode wird besonders in der Forschung verwendet,
                um Populationen zu überwachen und verschiedene Arten voneinander
                abzugrenzen.`,
        },
    ];
</script>

<section class="methoden-section">
    <h2>{heading}</h2>
    <p>In der wissenschaftlichen Vogelerkennung gibt es mehrere Ansätze:</p>
    <ul>
        {#each methods as method}
            <li>
                <strong>{method.title}:</strong>
                {method.description}
            </li>
        {/each}
    </ul>
</section>

<style>
    .methoden-section {
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
        font-size: 2rem;
        color: #2c3e50;
        margin-bottom: 1rem;
        text-align: center;
    }

    p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #555;
    }

    ul {
        font-size: 1rem;
        color: #555;
    }
</style>
