<!-- QuizSection.svelte -->
<script>
    export let buttonText = "Zum Quiz";
    export let link = "#/quiz";
</script>

<section class="quiz-section">
    <h2>Teste dein Wissen!</h2>
    <p>
        Möchtest du selbst ausprobieren, wie gut du Vögel erkennen kannst? Hier
        hast du die Gelegenheit! Klicke auf den Button, um am Quiz teilzunehmen.
        Viel Spaß beim Erkennen von Vögeln!
    </p>
    <a class="quiz-button" href={link}>{buttonText}</a>
</section>

<style>
    .quiz-section {
        background-color: #ffffff; /* Weißer Hintergrund */
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Schatten wie die anderen Sektionen */
        text-align: center;
        margin-top: 3rem;
    }

    .quiz-button {
        padding: 1rem 2rem;
        font-size: 1.2rem;
        background-color: #1abc9c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .quiz-button:hover {
        background-color: #16a085;
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
</style>
