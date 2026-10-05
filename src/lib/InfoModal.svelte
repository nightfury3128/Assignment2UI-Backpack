<script>
  /**
   * @type {{ open: boolean, onClose: () => void }}
   */
  let { open, onClose } = $props()

  /** @type {HTMLDivElement | null} */
  let dialogEl = $state(null)

  /** @param {KeyboardEvent} event */
  function onKeydown(event) {
    if (open && event.key === 'Escape') onClose()
  }

  $effect(() => {
    if (open) dialogEl?.focus()
  })
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
  <div class="backdrop">
    <button type="button" class="backdrop-hit" aria-label="Close info" onclick={onClose}></button>
    <div
      class="dialog"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      aria-labelledby="info-title"
      bind:this={dialogEl}
    >
      <div class="dialog-head">
        <h2 id="info-title">About this mock-up</h2>
        <button type="button" class="close" onclick={onClose}>Close</button>
      </div>
      <p class="lede">
        A mock-up of a Smart Backpack with a strap-mounted display and a companion phone app.
        Use the <strong>Testing UI</strong> on the right to simulate sensor input and watch
        the Device + Phone UIs respond.
      </p>
      <h3>How to use the simulator</h3>
      <ul>
        <li><strong>Bag Contents</strong> — every item has Add / Remove buttons. The readiness ring, "Missing" list, and the phone's Remember list all update live.</li>
        <li><strong>Sensors</strong> — Open/Close Zipper triggers an alert on the device screen and on the phone.</li>
        <li><strong>Weather</strong> — Simulate Rain / Sun toggles the rain alert everywhere.</li>
        <li><strong>Location</strong> — Move Phone Away raises a proximity notification on the phone.</li>
        <li>
          <strong>Day Type</strong> — picking Normal / Long Work / Travel Day changes what the bag <em>expects</em> you to have packed; it does <em>not</em> add anything for you. The missing list recomputes against the new requirements.
          <ul>
            <li>Normal Day — iPad, Lunch, Water bottle</li>
            <li>Long Work Day — Laptop, Lunch, Water bottle, iPad, Chargers</li>
            <li>Travel Day — Toothbrush, Camera, iPad, Chargers</li>
            <li>Gym Day — Clothes, Deodorant, Shoes, Towel, Water bottle</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 24px;
    z-index: 20;
  }

  .backdrop-hit {
    position: absolute;
    inset: 0;
    border: 0;
    padding: 0;
    background: rgba(20, 27, 51, 0.5);
    cursor: pointer;
  }

  .dialog {
    position: relative;
    z-index: 1;
    width: min(540px, 100%);
    background: var(--card);
    color: var(--ink);
    border-radius: 18px;
    padding: 22px 24px 18px;
    box-shadow: 0 24px 60px rgba(20, 27, 51, 0.32);
  }

  .lede {
    margin: 14px 0 6px;
    line-height: 1.5;
    color: var(--ink);
  }

  h3 {
    margin: 14px 0 4px;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .dialog:focus {
    outline: none;
  }

  .dialog-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  h2 {
    margin: 0;
    font-size: 20px;
  }

  .close {
    border: 0;
    background: var(--ink);
    color: #f8efdd;
    border-radius: 999px;
    padding: 8px 14px;
    cursor: pointer;
  }

  .close:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  ul {
    margin: 16px 0 18px;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  li {
    line-height: 1.45;
  }
</style>
