<!-- Banner.svelte -->
<script>
    export let title = "Willkommen zur Welt der Vogelerkennung";
</script>

<div class="banner">
    <h1>{title}</h1>
</div>

<style>
    .banner {
        position: relative;
        width: 100%;
        height: 400px;
        background-color: #2c3e50c7;
        color: white;
        text-align: center;
        padding: 50px 20px;
    }

    .banner h1 {
        position: relative;
        z-index: 1;
        font-size: 3rem;
        margin: 0;
    }
</style>
