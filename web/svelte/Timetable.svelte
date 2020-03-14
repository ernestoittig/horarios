<script>
  import { onMount } from "svelte";

  export let horarios,
    dayNames,
    subjectInfo,
    NUMBER_OF_PERIODS,
    breaks,
    Subject,
    changeTimes,
    timeRange;

  let showMenu, menuSubject, menuX, menuY, menuWidth, menuHeight;

  const grid = new Array(NUMBER_OF_PERIODS).fill([]).map(() => new Array(5));
  const todo = [];
  const counterThing = {};
  horarios.forEach((v, i) => {
    v.forEach((vv, j) => {
      if (counterThing[Subject[vv.subject]] === undefined) {
        counterThing[Subject[vv.subject]] = 0;
      } else {
        ++counterThing[Subject[vv.subject]];
      }
      const id = `${Subject[vv.subject]}${counterThing[Subject[vv.subject]]}`;
      grid[vv.pos[0] - 1][i] = { ...vv, id };
      vv.pos.slice(1).forEach(pos => (grid[pos - 1][i] = { ...vv, id }));
      todo.push({
        id,
        subject: vv.subject,
        name: subjectInfo.get(vv.subject).name,
        color: subjectInfo.get(vv.subject).color,
        onprimary: subjectInfo.get(vv.subject).onprimary,
        professor: subjectInfo.get(vv.subject).professor,
        notes: subjectInfo.get(vv.subject).notes
      });
    });
  });
  let baggage = 0;
  breaks.forEach(v => {
    if (counterThing["break"] === undefined) {
      counterThing["break"] = 0;
    } else {
      counterThing["break"]++;
    }
    grid.splice(
      v - 1 + baggage,
      0,
      new Array(6).fill({ id: `break${counterThing["break"]}` })
    );
    ++baggage;
    todo.push({
      id: `break${counterThing["break"]}`,
      subject: Subject.break,
      name: subjectInfo.get(Subject.break).name,
      color: subjectInfo.get(Subject.break).color,
      onprimary: subjectInfo.get(Subject.break).onprimary
    });
  });
  changeTimes.forEach((v, i) => {
    if (/^break\d+$/.test(grid[i][0].id)) {
      grid[i].forEach(vv => (vv.times = v));
      const t = todo.find(v => v.id === grid[i][0].id);
      t.name = `${t.name} ${timeRange(v[0], v[1])}`;
    } else {
      if (counterThing["t"] === undefined) {
        counterThing["t"] = 0;
      } else {
        counterThing["t"]++;
      }
      grid[i].splice(0, 0, { times: v, id: `t${counterThing["t"]}` });
      todo.push({ id: `t${counterThing["t"]}`, name: `${v[0]}&#8209;${v[1]}` });
    }
  });
  Object.defineProperty(window, "grid", {
    get: () => grid
  });

  function getPositions() {
    const lines = [JSON.stringify("empty m t w th f")];
    grid.forEach(v => {
      const words = [];
      v.forEach(vv => words.push(vv.id));
      lines.push(JSON.stringify(words.join(" ")));
    });
    return lines.join(" ");
  }

  function activateMenu(e, subject) {
    if (subject === undefined) {
      return;
    }
    console.log(e);
    menuSubject = subject;
    showMenu = true;
    menuX = e.pageX;
    menuY = e.pageY;
  }

  onMount(() => {
    document.querySelector(
      ".container"
    ).style.gridTemplateAreas = getPositions();
  });
</script>

<style>
  .container {
    display: grid;
    width: 100%;
    grid-auto-rows: 1fr;
  }

  .container > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .gray {
    background-color: #e4e4e4;
  }

  .clickable {
    cursor: pointer;
  }

  .menu {
    z-index: 1000;
    position: absolute;
    margin: 0;
    width: 15em;
    padding: 5px;

    background-color: whitesmoke;
    border: solid #d4d3d3 6px;
    border-radius: 12px;
  }

  .scrim {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
</style>

<table class="container">
  <div class="gray" style="grid-area: empty" />
  {#each dayNames as dayName, i}
    <div class="gray" style="grid-area: {['m', 't', 'w', 'th', 'f'][i]};">
      {dayName}
    </div>
  {/each}
  {#each todo as t}
    <div
      class:gray={t.subject === undefined}
      class:clickable={t.subject !== undefined && t.subject !== Subject.break}
      on:click={e => activateMenu(e, t.subject === Subject.break ? undefined : t.subject)}
      style="grid-area: {t.id}; {t.color ? `background-color: ${t.color};` : ''}
      {t.onprimary ? `color: ${t.onprimary};` : ''}">
      {@html t.name}
    </div>
  {/each}
</table>

{#if showMenu}
  <menu
    bind:clientWidth={menuWidth}
    bind:clientHeight={menuHeight}
    class="menu"
    style="left: {menuX - menuWidth / 2}px;top: {menuY - menuHeight / 2}px">
    <b>{subjectInfo.get(menuSubject).name}</b>
    <!-- // TODO: i18n -->
    {#if subjectInfo.get(menuSubject).professor}
    <p>Profesor: {subjectInfo.get(menuSubject).professor}</p>
    {/if}
    {#if subjectInfo.get(menuSubject).notes}
    <p>Notas: {subjectInfo.get(menuSubject).notes}</p>
    {/if}
  </menu>
  <div class="scrim" on:click={() => (showMenu = false)} />
{/if}
