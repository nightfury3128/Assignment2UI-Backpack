<script>
  import { state, items, dayTypes } from './state.svelte.js'

  const required = $derived(dayTypes[state.dayType].required)
  const dayLabel = $derived(dayTypes[state.dayType].label)
  const presentRequired = $derived(required.filter((k) => state.present[k]).length)
  const readiness = $derived(
    required.length === 0 ? 100 : Math.round((presentRequired / required.length) * 100)
  )
  const missing = $derived(
    required.filter((k) => !state.present[k]).map((k) => items[k].label)
  )
  const alerts = $derived(
    [
      state.zipperOpen ? { kind: 'zip', text: 'Laptop zip open' } : null,
      state.weather.rainExpectedAt
        ? { kind: 'rain', text: `Rain expected at ${state.weather.rainExpectedAt}` }
        : null,
    ].filter(Boolean)
  )

  const upcoming = [
    { when: '18:00', title: 'Study group', place: 'Library · Rm 204' },
    { when: 'Wed 09:00', title: 'Design studio', place: 'Baker Hall' },
    { when: 'Wed 13:30', title: 'Flight CVG → JFK', place: 'Gate B14' },
  ]

  const dashArray = $derived(`${(readiness / 100) * 88} 88`)
</script>

<div class="mount">
  <p class="mount-label">Front-panel display</p>
  <div class="bezel">
    <div class="screen">
      <div class="status">
        <p class="time">14:32</p>
        <p class="date">Tue Sept 14</p>
        <p class="temp">{state.weather.temp}°C</p>
      </div>

      <article class="card ready">
        <div class="ready-left">
          <div class="donut" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e3d4b8" stroke-width="4" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#a0532a"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray={dashArray}
                transform="rotate(-90 18 18)"
              />
            </svg>
            <span class="donut-value">{readiness}%</span>
          </div>
          <div class="ready-copy">
            <p class="ready-title">Ready</p>
            <p class="ready-sub">
              {missing.length === 0
                ? 'All packed'
                : `Missing ${missing.length} ${missing.length === 1 ? 'item' : 'items'}`}
            </p>
            <p class="day-pill">{dayLabel}</p>
          </div>
        </div>

        <div class="missing-list" aria-label="Missing items">
          <p class="missing-head">Missing</p>
          {#if missing.length === 0}
            <p class="missing-empty">Nothing missing — you're set.</p>
          {:else}
            <ul>
              {#each missing as item}
                <li>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="#fee2e2" />
                    <path d="M8 8l8 8M16 8l-8 8" stroke="#d64545" stroke-width="2" stroke-linecap="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </article>

      <div class="split">
        <article class="card event-card">
          <p class="event-kicker">Next event</p>
          <p class="event-title">CVG → ORD</p>
          <p class="event-when">Today · 16:00</p>
          <div class="route" aria-hidden="true">
            <span>CVG</span>
            <span class="route-line"></span>
            <span>ORD</span>
          </div>
        </article>

        <article class="card upcoming-card">
          <p class="event-kicker">Upcoming</p>
          <ul>
            {#each upcoming as item}
              <li>
                <span class="when">{item.when}</span>
                <span class="meta">
                  <span class="title">{item.title}</span>
                  <span class="place">{item.place}</span>
                </span>
              </li>
            {/each}
          </ul>
        </article>
      </div>

      <article class="card alerts" class:empty={alerts.length === 0}>
        {#if alerts.length === 0}
          <p class="alerts-empty">No active alerts</p>
        {:else}
          {#each alerts as alert}
            <div class="alert-row">
              {#if alert.kind === 'zip'}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.5 2.8 20h18.4L12 3.5z" fill="#f0b429" />
                  <path d="M12 9v5" stroke="#3d2c10" stroke-width="1.8" stroke-linecap="round" />
                  <circle cx="12" cy="16.6" r="1" fill="#3d2c10" />
                </svg>
              {:else}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 13h10a4 4 0 0 0 .4-8 5 5 0 0 0-9.6-1.2A3.5 3.5 0 0 0 7 13z" fill="#7eb6e0" />
                  <g stroke="#3b82f6" stroke-width="1.4" stroke-linecap="round">
                    <path d="M9 16.5v2M12 16.5v2.6M15 16.5v2" />
                  </g>
                </svg>
              {/if}
              <p>{alert.text}</p>
            </div>
          {/each}
        {/if}
      </article>
    </div>
  </div>
</div>

<style>
  .mount {
    background:
      radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.18), transparent 42%),
      #a0532a;
    border-radius: 32px;
    padding: 16px 16px 18px;
    box-shadow: 0 18px 36px rgba(26, 35, 64, 0.22);
  }

  .mount-label {
    margin: 2px 10px 10px;
    color: #f8efdd;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .bezel {
    background: #141b33;
    border-radius: 28px;
    padding: 12px;
  }

  .screen {
    background: #f8efdd;
    border-radius: 22px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #1a2340;
  }

  .status {
    display: grid;
    grid-template-columns: 1fr 1.4fr 1fr;
    align-items: center;
    padding: 2px 6px 0;
  }

  p {
    margin: 0;
  }

  .time,
  .date,
  .temp {
    font-size: 24px;
    font-weight: 650;
  }

  .date {
    text-align: center;
  }

  .temp {
    text-align: right;
  }

  .card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 1px 0 rgba(28, 25, 23, 0.04);
  }

  .ready {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 20px;
    padding: 16px 20px;
  }

  .ready-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .donut {
    position: relative;
    width: 86px;
    height: 86px;
    flex: 0 0 auto;
  }

  .donut svg {
    width: 100%;
    height: 100%;
  }

  .donut-value {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #1a2340;
  }

  .ready-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ready-title {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.1;
  }

  .ready-sub {
    color: #6b7390;
    font-size: 14px;
  }

  .day-pill {
    margin-top: 6px;
    display: inline-block;
    align-self: flex-start;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    background: #f3e4c9;
    padding: 3px 8px;
    border-radius: 999px;
  }

  .missing-list {
    border-left: 1px solid #ececec;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .missing-head {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b7390;
  }

  .missing-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .missing-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 17px;
    font-weight: 600;
    color: #1a2340;
  }

  .missing-list svg {
    width: 20px;
    height: 20px;
    flex: 0 0 auto;
  }

  .missing-empty {
    color: #2f9d57;
    font-size: 14px;
    font-weight: 600;
  }

  .split {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 12px;
  }

  .event-card,
  .upcoming-card {
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .event-card {
    background: #ebe4d0;
  }

  .event-kicker {
    color: #6b7390;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .event-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.1;
  }

  .event-when {
    color: #6b7390;
    font-size: 15px;
  }

  .route {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
    color: #1a2340;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .route-line {
    flex: 1;
    height: 2px;
    border-radius: 999px;
    background: #a0532a;
  }

  .upcoming-card ul {
    list-style: none;
    margin: 2px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .upcoming-card li {
    display: grid;
    grid-template-columns: 72px 1fr;
    align-items: center;
    gap: 10px;
  }

  .upcoming-card .when {
    font-size: 13px;
    font-weight: 700;
    color: #a0532a;
  }

  .upcoming-card .meta {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }

  .upcoming-card .title {
    font-size: 15px;
    font-weight: 650;
  }

  .upcoming-card .place {
    color: #6b7390;
    font-size: 12px;
  }

  .alerts {
    padding: 12px 18px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 24px;
    flex-wrap: wrap;
    min-height: 46px;
    align-items: center;
  }

  .alerts.empty {
    justify-content: center;
  }

  .alerts-empty {
    color: #6f675f;
    font-size: 14px;
  }

  .alert-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .alert-row svg {
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
  }

  .alert-row p {
    font-size: 15px;
    font-weight: 650;
    line-height: 1.2;
  }
</style>
