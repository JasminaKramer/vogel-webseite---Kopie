<!-- InfoSection.svelte -->
<script>
    export let heading = "Was ist Vogelerkennung?";
    export let content = `
        Vogelerkennung ist ein spannendes Feld, das es uns ermöglicht, Vögel
        zu identifizieren und zu klassifizieren. In der Wissenschaft wird
        diese Fähigkeit eingesetzt, um Vögel in ihrem natürlichen Lebensraum
        zu beobachten, ihre Populationen zu überwachen und mehr über ihre
        Verhaltensweisen und Lebensräume zu erfahren. Die Vogelerkennung
        erfolgt heute mit verschiedenen Methoden, von klassischen
        Feldbeobachtungen bis hin zu modernen Technologien.
    `;
</script>

<section class="info-section">
    <h2>{heading}</h2>
    <p>{content}</p>
</section>

<style>
    .info-section {
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
</style>
