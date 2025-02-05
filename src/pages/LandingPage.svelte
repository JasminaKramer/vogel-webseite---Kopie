<!-- Home-Seite -->
<script>
    import Banner from "../components/Banner.svelte";
    import InfoSection from "../components/InfoSection.svelte";
    import MethodenSection from "../components/MethodenSection.svelte";
    import QuizSection from "../components/QuizSection.svelte";
</script>

<main>
    <Banner />
    <InfoSection />
    <MethodenSection />
    <QuizSection />
</main>

<style>
    main {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
    }
</style>
