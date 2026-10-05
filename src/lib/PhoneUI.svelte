<script>
  import { state, items, dayTypes } from './state.svelte.js'

  const dayLabel = $derived(dayTypes[state.dayType].label)
  const required = $derived(dayTypes[state.dayType].required)

  const remember = $derived(
    required.map((k) => ({
      name: items[k].label,
      state: state.present[k] ? 'present' : 'missing',
    }))
  )
  const extras = $derived(
    Object.keys(items)
      .filter((k) => !required.includes(k) && state.present[k])
      .map((k) => ({ name: items[k].label, state: 'present' }))
  )

  const notifications = $derived(
    [
      state.zipperOpen ? { title: 'Laptop zip left open', time: '2m ago' } : null,
      state.weather.rainExpectedAt
        ? { title: `Rain expected at ${state.weather.rainExpectedAt}`, time: '12m ago' }
        : null,
      state.phoneDistance > 10
        ? { title: `Bag ${state.phoneDistance} m away`, time: 'now' }
        : null,
    ].filter(Boolean)
  )

  const batteryPct = $derived(Math.min(100, Math.max(0, state.bagBattery)))
  const nearbyPct = $derived(
    Math.max(0, Math.min(100, 100 - state.phoneDistance * 4))
  )
  const nearbyLabel = $derived(
    state.phoneDistance >= 10 ? `${state.phoneDistance} m` : `${state.phoneDistance} m`
  )
</script>

<div class="phone">
  <span class="side-button" aria-hidden="true"></span>
  <div class="screen">
    <div class="island" aria-hidden="true"></div>
    <div class="status">
      <span>8:42</span>
      <span>LTE</span>
    </div>

    <div class="pack-head">
      <span class="custom" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <circle cx="12" cy="8" r="3.2" fill="currentColor" />
          <path d="M6 19c1.2-3 3.2-4.4 6-4.4S16.8 16 18 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </span>
      <div class="pack-copy">
        <p class="date">Tue Sept 14</p>
        <p class="muted">Nipun's backpack · {dayLabel}</p>
      </div>
      <p class="temp">{state.weather.temp}°</p>
    </div>

    <div class="pack-stats">
      <div class="stat">
        <span class="stat-label">Battery</span>
        <span class="stat-value">{batteryPct}%</span>
        <span class="bar"><span class="bar-fill" style="width: {batteryPct}%"></span></span>
      </div>
      <div class="stat">
        <span class="stat-label">Zipper</span>
        <span class="stat-value" class:warn={state.zipperOpen}>
          {state.zipperOpen ? 'Open' : 'Closed'}
        </span>
        <span class="bar"><span
          class="bar-fill"
          class:warn={state.zipperOpen}
          class:good={!state.zipperOpen}
          style="width: {state.zipperOpen ? 40 : 100}%"
        ></span></span>
      </div>
      <div class="stat">
        <span class="stat-label">Nearby</span>
        <span class="stat-value">{nearbyLabel}</span>
        <span class="bar"><span
          class="bar-fill"
          class:warn={state.phoneDistance > 10}
          class:good={state.phoneDistance <= 10}
          style="width: {nearbyPct}%"
        ></span></span>
      </div>
    </div>

    <div class="actions">
      <button type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
        <span>Find bag</span>
      </button>
      <button type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.8" /></svg>
        <span>Lock</span>
      </button>
      <button type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8" /></svg>
        <span>Light</span>
      </button>
    </div>

    <div class="lists">
      <section>
        <h3>Remember · {dayLabel}</h3>
        <ul>
          {#each remember as item}
            <li>
              <span class="name">{item.name}</span>
              <span class="mark {item.state}" aria-hidden="true"></span>
            </li>
          {/each}
        </ul>
      </section>

      <section>
        <h3>Also in bag</h3>
        {#if extras.length === 0}
          <p class="empty-extras">Nothing extra</p>
        {:else}
          <ul>
            {#each extras as item}
              <li>
                <span class="name">{item.name}</span>
                <span class="mark {item.state}" aria-hidden="true"></span>
              </li>
            {/each}
          </ul>
        {/if}
      </section>
    </div>

    <section class="notifs">
      <h3>Alerts</h3>
      {#if notifications.length === 0}
        <p class="empty">No alerts</p>
      {:else}
        <ul>
          {#each notifications as n}
            <li>
              <span class="dot" aria-hidden="true"></span>
              <span class="n-title">{n.title}</span>
              <span class="n-time">{n.time}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  </div>
</div>

<style>
  .phone {
    position: relative;
    width: 340px;
    margin: 0 auto;
    background: #141b33;
    border-radius: 44px;
    padding: 12px;
    box-shadow:
      0 24px 40px rgba(20, 27, 51, 0.28),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .side-button {
    position: absolute;
    left: -3px;
    top: 118px;
    width: 3px;
    height: 46px;
    border-radius: 2px;
    background: #2a3250;
  }

  .screen {
    position: relative;
    background: #f8efdd;
    border-radius: 34px;
    overflow: hidden;
    padding: 16px 14px 20px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .island {
    position: absolute;
    top: 10px;
    left: 50%;
    width: 92px;
    height: 22px;
    transform: translateX(-50%);
    background: #141b33;
    border-radius: 999px;
  }

  .status {
    display: flex;
    justify-content: space-between;
    padding: 2px 8px 0;
    font-size: 12px;
    font-weight: 650;
  }

  .pack-head {
    display: grid;
    grid-template-columns: 32px 1fr auto;
    align-items: center;
    gap: 10px;
    margin: 22px 4px 0;
  }

  .custom {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: #ebe4d0;
    color: #a0532a;
  }

  .pack-copy {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  .date,
  .temp,
  .muted {
    margin: 0;
  }

  .date {
    font-size: 15px;
    font-weight: 650;
  }

  .muted {
    color: #6b7390;
    font-size: 12px;
    margin-top: 2px;
  }

  .temp {
    font-size: 18px;
    font-weight: 650;
  }

  .pack-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    background: white;
    border-radius: 14px;
    padding: 10px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .stat-label {
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b7390;
  }

  .stat-value {
    font-size: 15px;
    font-weight: 700;
    color: #1a2340;
  }

  .stat-value.warn {
    color: #a0532a;
  }

  .bar {
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 999px;
    background: #e3d7bd;
    overflow: hidden;
    margin-top: 2px;
  }

  .bar-fill {
    display: block;
    height: 100%;
    background: #1a2340;
    border-radius: 999px;
  }

  .bar-fill.warn {
    background: #a0532a;
  }

  .bar-fill.good {
    background: #1a2340;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }

  .actions button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 6px;
    border: 0;
    background: white;
    border-radius: 14px;
    color: #1a2340;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .actions svg {
    width: 20px;
    height: 20px;
    color: #a0532a;
  }

  .actions button:hover {
    background: #fdf6e5;
  }

  .lists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;
    align-items: start;
  }

  h3 {
    margin: 0 0 6px;
    text-align: left;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7390;
  }

  .lists ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .lists li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 34px;
    padding: 7px 10px;
    background: white;
    border-radius: 10px;
  }

  .empty-extras {
    margin: 0;
    padding: 7px 10px;
    background: white;
    border-radius: 10px;
    color: #6b7390;
    font-size: 12px;
  }

  .name {
    font-size: 14px;
    font-weight: 500;
  }

  .mark {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    flex: 0 0 auto;
  }

  .present {
    background: #1a2340;
  }

  .missing {
    background: #a0532a;
  }

  .open {
    background: white;
    box-shadow: inset 0 0 0 1.5px #c4b58f;
  }

  .notifs ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .notifs li {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: white;
    border-radius: 10px;
  }

  .notifs .empty {
    color: #6b7390;
    font-size: 12px;
    padding: 8px 10px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #a0532a;
  }

  .n-title {
    font-size: 13px;
    font-weight: 550;
    color: #1a2340;
  }

  .n-time {
    font-size: 11px;
    color: #6b7390;
  }
</style>
