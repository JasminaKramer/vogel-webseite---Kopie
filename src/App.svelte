<script>
  import Router from "svelte-spa-router";
  import LandingPage from "./pages/LandingPage.svelte";
  import ReserveOverview from "./pages/Erkennungsquizz.svelte";
  import Erkennungsquizz from "./pages/Erkennungsquizz.svelte";

  const routes = {
    "/": LandingPage,
    "/reserves": Erkennungsquizz,
    "/quiz": Erkennungsquizz,
  };
</script>

<header>
  <h1>Vogelerkennung</h1>
  <nav>
    <a href="#/">Home</a>
    <a href="#/reserves">Erkennungsquizz</a>
  </nav>
</header>
<main>
  <Router {routes} />
</main>
<footer>
  <p>&copy; 2025 Vogelerkennung. Alle Rechte vorbehalten.</p>
</footer>

<style>
</style>
