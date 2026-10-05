<script>
  import BackpackUI from './lib/BackpackUI.svelte'
  import PhoneUI from './lib/PhoneUI.svelte'
  import TestingPanel from './lib/TestingPanel.svelte'

  const studentName = 'Nipun'
</script>

<div class="page">
  <header class="topbar">
    <div class="identity">
      <p class="eyebrow">HCI smart object</p>
      <h1>Smart Backpack</h1>
      <p class="student">{studentName}</p>
    </div>

    <figure class="placement" aria-label="Where the display mounts on the backpack">
      <svg viewBox="0 0 120 140" aria-hidden="true">
        <path
          d="M30 30 Q30 14 50 14 L70 14 Q90 14 90 30 L90 36 L100 42 Q110 48 110 62 L110 118 Q110 130 98 130 L22 130 Q10 130 10 118 L10 62 Q10 48 20 42 L30 36 Z"
          fill="#a0532a" stroke="#7f3f1d" stroke-width="2"
        />
        <path d="M30 36 L30 52 Q30 58 36 58 L84 58 Q90 58 90 52 L90 36" fill="none" stroke="#7f3f1d" stroke-width="1.6" />
        <rect x="38" y="78" width="44" height="32" rx="4" fill="#f8efdd" stroke="#7f3f1d" stroke-width="1.6" />
        <rect x="18" y="60" width="12" height="52" rx="4" fill="#a0532a" stroke="#7f3f1d" stroke-width="1.6" />
        <rect x="90" y="60" width="12" height="52" rx="4" fill="#a0532a" stroke="#7f3f1d" stroke-width="1.6" />
        <rect x="19.5" y="78" width="9" height="14" rx="2" fill="#1a2340" />
        <circle cx="24" cy="85" r="3" fill="#f8efdd" />
        <path d="M30 85 L54 80" stroke="#1a2340" stroke-width="1.2" stroke-dasharray="2 2" />
      </svg>
      <figcaption>Display mounts on the left strap</figcaption>
    </figure>

  </header>

  <main class="workspace">
    <section class="column device-column" aria-label="Device UI">
      <div class="column-heading">
        <h2>Device UI</h2>
        <p>The screen built into the strap of the backpack.</p>
      </div>

      <BackpackUI />
    </section>

    <section class="column phone-column" aria-label="Phone UI">
      <div class="column-heading">
        <h2>Phone UI</h2>
        <p>Companion app — mirrors bag state and sends alerts.</p>
      </div>
      <PhoneUI />
    </section>

    <section class="column testing-column" aria-label="Testing UI">
      <TestingPanel />
    </section>
  </main>
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding: 22px 28px 18px;
    background: var(--card);
    border-bottom: 1px solid var(--line);
  }

  .eyebrow {
    margin: 0 0 4px;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
  }

  h1 {
    margin: 0;
    font-size: 32px;
    line-height: 1.1;
    font-weight: 650;
  }

  .student {
    margin: 6px 0 0;
    color: var(--muted);
    font-size: 16px;
  }

  .workspace {
    flex: 1;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1.2fr;
    gap: 32px;
    align-content: start;
    align-items: start;
    padding: 32px 48px 48px;
  }

  .column-heading h2 {
    margin: 0;
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .column-heading p {
    margin: 4px 0 12px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.4;
  }

  .placement {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 18px 10px 14px;
    background: linear-gradient(135deg, #fbf3e2, #f0e6d0);
    border: 1px solid var(--line);
    border-radius: 14px;
    box-shadow: var(--shadow);
  }

  .placement svg {
    width: 72px;
    height: 84px;
    display: block;
    flex: 0 0 auto;
  }

  .placement figcaption {
    font-size: 12px;
    line-height: 1.35;
    color: var(--muted);
    max-width: 140px;
  }

  .testing-column {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 20px;
    box-shadow: var(--shadow);
  }
</style>
