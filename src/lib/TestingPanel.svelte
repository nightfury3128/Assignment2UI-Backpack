<script>
  import {
    state,
    items,
    dayTypes,
    addItem,
    removeItem,
    setZipper,
    setRain,
    setPhoneDistance,
    setDayType,
    resetAll,
  } from './state.svelte.js'

  const itemKeys = Object.keys(items)
  const dayKeys  = Object.keys(dayTypes)
</script>

<div class="panel">
  <div class="heading">
    <p class="eyebrow">Simulator</p>
    <h2>Testing UI</h2>
    <p class="hint">Trigger sensors and scenarios to see how the backpack responds.</p>
  </div>

  <section class="group">
    <h3>Bag Contents</h3>
    <ul class="items">
      {#each itemKeys as key}
        <li class="item-row">
          <span class="item-name">{items[key].label}</span>
          <div class="pair">
            <button
              type="button"
              class="add"
              onclick={() => addItem(key)}
              disabled={state.present[key]}
            >
              Add
            </button>
            <button
              type="button"
              class="remove"
              onclick={() => removeItem(key)}
              disabled={!state.present[key]}
            >
              Remove
            </button>
          </div>
        </li>
      {/each}
    </ul>
  </section>

  <section class="group">
    <h3>Sensors</h3>
    <div class="buttons">
      <button type="button" onclick={() => setZipper(true)}  disabled={state.zipperOpen}>Open Zipper</button>
      <button type="button" onclick={() => setZipper(false)} disabled={!state.zipperOpen}>Close Zipper</button>
    </div>
  </section>

  <section class="group">
    <h3>Weather</h3>
    <div class="buttons">
      <button type="button" onclick={() => setRain(true)}  disabled={!!state.weather.rainExpectedAt}>Simulate Rain</button>
      <button type="button" onclick={() => setRain(false)} disabled={!state.weather.rainExpectedAt}>Simulate Sun</button>
    </div>
  </section>

  <section class="group">
    <h3>Location</h3>
    <div class="buttons">
      <button type="button" onclick={() => setPhoneDistance(15)} disabled={state.phoneDistance > 10}>Move Phone Away</button>
      <button type="button" onclick={() => setPhoneDistance(2)}  disabled={state.phoneDistance <= 2}>Return to Bag</button>
    </div>
  </section>

  <section class="group">
    <h3>Day Type</h3>
    <p class="sub">Changes what the bag expects — doesn't add items for you.</p>
    <div class="buttons">
      {#each dayKeys as key}
        <button
          type="button"
          class="day-btn"
          class:active={state.dayType === key}
          onclick={() => setDayType(key)}
        >
          {dayTypes[key].label}
        </button>
      {/each}
      <button type="button" class="reset" onclick={resetAll}>Reset All</button>
    </div>
  </section>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .heading {
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
  }

  .eyebrow {
    margin: 0;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .heading h2 {
    margin: 4px 0 6px;
    font-size: 20px;
    font-weight: 650;
    color: var(--ink);
  }

  .hint {
    margin: 0;
    font-size: 13px;
    line-height: 1.4;
    color: var(--muted);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h3 {
    margin: 0;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .sub {
    margin: -4px 0 0;
    font-size: 12px;
    color: var(--muted);
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  button {
    width: 100%;
    border: 1px solid var(--line);
    background: var(--card);
    color: var(--ink);
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 550;
    line-height: 1.2;
    text-align: left;
    cursor: pointer;
    transition: border-color 120ms ease, background 120ms ease, color 120ms ease, transform 60ms ease;
  }

  button:hover:not(:disabled) {
    background: #fdf6e5;
    border-color: var(--accent);
    color: var(--accent);
  }

  button:active:not(:disabled) {
    transform: translateY(1px);
  }

  button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .items {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .item-row {
    display: grid;
    grid-template-columns: 1fr 160px;
    align-items: center;
    gap: 10px;
    padding: 6px 2px;
  }

  .item-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
  }

  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .pair button {
    text-align: center;
    padding: 7px 8px;
    font-size: 12px;
  }

  .add:not(:disabled):hover {
    background: #eef4e6;
    border-color: #4b7a3c;
    color: #2f5324;
  }

  .remove:not(:disabled):hover {
    background: #f8e6dc;
    border-color: var(--accent-deep);
    color: var(--accent-deep);
  }

  .day-btn.active {
    background: var(--ink);
    color: var(--card);
    border-color: var(--ink);
  }

  .day-btn.active:hover {
    background: var(--navy-deep);
    color: var(--card);
    border-color: var(--navy-deep);
  }

  .reset {
    grid-column: 1 / -1;
    text-align: center;
    border-style: dashed;
  }
</style>
