<script>
  import "normalize.css";

  import horarios, {
    subjectInfo,
    NUMBER_OF_PERIODS,
    breaks,
    Subject,
    changeTimes
  } from "../../dist/horarios.js";
  import Timetable from "./Timetable.svelte";

  let h = {
    horarios,
    dayNames: ["L", "M", "X", "J", "V"],
    subjectInfo,
    NUMBER_OF_PERIODS,
    breaks,
    Subject,
    changeTimes,
    timeRange: (a, b) => `de ${a} a ${b}`
  };
</script>

<style>
  :global(html, body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  main {
    text-align: center;
  }
</style>

<main>
  <Timetable {...h} />
</main>
