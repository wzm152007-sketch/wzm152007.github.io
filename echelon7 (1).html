<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ÉCHELON 7 — MEMBERSHIP</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --black: #080808;
    --white: #F0EDE6;
    --red: #E8220A;
    --orange: #FF6B1A;
    --grey: #1A1A1A;
    --mid: #2E2E2E;
    --dim: #6B6B6B;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: 'DM Mono', monospace;
    overflow-x: hidden;
    cursor: crosshair;
  }

  /* ── NOISE OVERLAY ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
    z-index: 9999;
  }

  /* ── NAV ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid rgba(240,237,230,0.08);
    backdrop-filter: blur(12px);
    background: rgba(8,8,8,0.7);
  }

  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    letter-spacing: 0.15em;
    color: var(--white);
    text-decoration: none;
  }

  .nav-logo span { color: var(--red); }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .nav-links a {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--dim);
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--white); }

  .nav-cta {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--black);
    background: var(--red);
    padding: 10px 22px;
    border: none;
    cursor: crosshair;
    transition: background 0.2s, transform 0.15s;
  }

  .nav-cta:hover { background: var(--orange); transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    padding: 120px 40px 60px;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 50%, rgba(232,34,10,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(255,107,26,0.06) 0%, transparent 60%);
  }

  .hero-label {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 24px;
    opacity: 0;
    animation: fadeUp 0.8s 0.2s forwards;
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5rem, 15vw, 14rem);
    line-height: 0.88;
    letter-spacing: -0.02em;
    opacity: 0;
    animation: fadeUp 0.9s 0.4s forwards;
  }

  .hero-title em {
    font-style: normal;
    color: transparent;
    -webkit-text-stroke: 1px rgba(240,237,230,0.3);
  }

  .hero-sub {
    max-width: 420px;
    margin-top: 40px;
    font-size: 0.8rem;
    line-height: 1.8;
    color: var(--dim);
    opacity: 0;
    animation: fadeUp 0.9s 0.7s forwards;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    margin-top: 48px;
    opacity: 0;
    animation: fadeUp 0.9s 0.9s forwards;
  }

  .btn-primary {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--black);
    background: var(--white);
    padding: 16px 36px;
    border: none;
    cursor: crosshair;
    transition: background 0.2s, transform 0.15s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-primary:hover { background: var(--red); color: var(--white); transform: translateY(-2px); }

  .btn-secondary {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--white);
    background: transparent;
    padding: 16px 36px;
    border: 1px solid rgba(240,237,230,0.2);
    cursor: crosshair;
    transition: border-color 0.2s, transform 0.15s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-secondary:hover { border-color: var(--white); transform: translateY(-2px); }

  .hero-counter {
    display: flex;
    gap: 48px;
    opacity: 0;
    animation: fadeUp 0.9s 1.1s forwards;
  }

  .counter-item { }

  .counter-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.8rem;
    line-height: 1;
    color: var(--white);
  }

  .counter-num span { color: var(--red); }

  .counter-label {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--dim);
    margin-top: 4px;
  }

  /* ── TICKER ── */
  .ticker {
    background: var(--red);
    padding: 12px 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .ticker-track {
    display: inline-flex;
    animation: ticker 20s linear infinite;
  }

  .ticker-item {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1rem;
    letter-spacing: 0.2em;
    padding: 0 40px;
    color: var(--black);
  }

  .ticker-sep {
    color: rgba(8,8,8,0.4);
  }

  /* ── SECTION HEADER ── */
  .section {
    padding: 120px 40px;
  }

  .section-tag {
    font-size: 0.62rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-tag::before {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: var(--red);
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    line-height: 0.92;
    letter-spacing: 0.02em;
    margin-bottom: 60px;
  }

  /* ── DROP SECTION ── */
  .drop-section {
    background: var(--grey);
    border-top: 1px solid var(--mid);
    border-bottom: 1px solid var(--mid);
  }

  .drop-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-top: 0;
  }

  .drop-card {
    background: var(--black);
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }

  .drop-card:hover { background: #111; }

  .drop-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--red);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s;
  }

  .drop-card:hover::after { transform: scaleX(1); }

  .drop-icon {
    font-size: 2rem;
    margin-bottom: 24px;
  }

  .drop-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }

  .drop-text {
    font-size: 0.78rem;
    line-height: 1.9;
    color: var(--dim);
  }

  .drop-num {
    position: absolute;
    top: 32px; right: 40px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4rem;
    color: rgba(240,237,230,0.04);
    line-height: 1;
    pointer-events: none;
  }

  /* ── MEMBERSHIP LEVELS ── */
  .levels-section {}

  .levels-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }

  .level-card {
    background: var(--grey);
    padding: 48px 36px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s;
    border: 1px solid transparent;
  }

  .level-card:hover {
    border-color: var(--mid);
    transform: translateY(-4px);
  }

  .level-card.featured {
    background: var(--red);
    border-color: var(--red);
  }

  .level-card.featured .level-num,
  .level-card.featured .level-desc,
  .level-card.featured .perk-item { color: rgba(8,8,8,0.7); }

  .level-card.featured .level-name { color: var(--black); }

  .level-badge {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--black);
    background: var(--white);
    padding: 4px 12px;
    display: inline-block;
    margin-bottom: 32px;
  }

  .level-card.featured .level-badge {
    background: var(--black);
    color: var(--white);
  }

  .level-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 5rem;
    line-height: 1;
    color: rgba(240,237,230,0.12);
    margin-bottom: -8px;
  }

  .level-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 12px;
  }

  .level-desc {
    font-size: 0.72rem;
    line-height: 1.8;
    color: var(--dim);
    margin-bottom: 32px;
  }

  .perks {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .perk-item {
    font-size: 0.72rem;
    color: var(--dim);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .perk-item::before {
    content: '→';
    color: var(--red);
    flex-shrink: 0;
  }

  .level-card.featured .perk-item::before { color: var(--black); }

  /* ── GAME SECTION ── */
  .game-section {
    background: var(--grey);
    border-top: 1px solid var(--mid);
    border-bottom: 1px solid var(--mid);
  }

  .game-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .leaderboard {
    background: var(--black);
    border: 1px solid var(--mid);
  }

  .lb-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--mid);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .lb-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1rem;
    letter-spacing: 0.1em;
  }

  .lb-live {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--red);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .lb-live::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--red);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  .lb-row {
    display: grid;
    grid-template-columns: 32px 1fr 80px 80px;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(46,46,46,0.5);
    align-items: center;
    transition: background 0.2s;
  }

  .lb-row:hover { background: rgba(240,237,230,0.03); }

  .lb-rank {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2rem;
    color: var(--dim);
  }

  .lb-row.top-1 .lb-rank { color: var(--orange); }
  .lb-row.top-2 .lb-rank { color: #C0C0C0; }
  .lb-row.top-3 .lb-rank { color: #CD7F32; }

  .lb-name {
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  .lb-badge {
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dim);
    background: var(--mid);
    padding: 2px 8px;
    text-align: center;
  }

  .lb-pts {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.1rem;
    color: var(--red);
    text-align: right;
  }

  .game-content .section-tag { margin-bottom: 16px; }

  .game-perks {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
  }

  .game-perk {
    display: flex;
    gap: 20px;
    padding: 20px;
    background: var(--black);
    border-left: 2px solid transparent;
    transition: border-color 0.3s;
  }

  .game-perk:hover { border-color: var(--red); }

  .gp-icon { font-size: 1.4rem; flex-shrink: 0; }

  .gp-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .gp-desc {
    font-size: 0.7rem;
    line-height: 1.7;
    color: var(--dim);
  }

  /* ── CARD SECTION ── */
  .card-section { }

  .card-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .loyalty-card {
    aspect-ratio: 1.586;
    background: linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 50%, #1A1A1A 100%);
    border: 1px solid rgba(240,237,230,0.12);
    padding: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(232,34,10,0.2);
    transform: perspective(800px) rotateY(-8deg) rotateX(4deg);
    transition: transform 0.4s;
  }

  .loyalty-card:hover {
    transform: perspective(800px) rotateY(0deg) rotateX(0deg);
  }

  .loyalty-card::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(ellipse at center, rgba(232,34,10,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .card-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.15em;
    color: var(--white);
  }

  .card-logo span { color: var(--red); }

  .card-chip {
    width: 44px; height: 34px;
    background: linear-gradient(135deg, #B8A870, #8B7D55);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .card-chip::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 2px;
  }

  .card-mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-level {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .card-level-sub {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--dim);
    margin-top: 4px;
  }

  .card-progress-wrap { flex: 1; margin-left: 32px; }

  .card-progress-label {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--dim);
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }

  .card-progress-bar {
    height: 3px;
    background: var(--mid);
    position: relative;
    overflow: hidden;
  }

  .card-progress-fill {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 62%;
    background: linear-gradient(90deg, var(--red), var(--orange));
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .card-num {
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    color: rgba(240,237,230,0.5);
  }

  .card-pts {
    text-align: right;
  }

  .card-pts-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    color: var(--red);
    line-height: 1;
  }

  .card-pts-label {
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--dim);
  }

  .card-info h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 16px;
    line-height: 1.1;
  }

  .card-info p {
    font-size: 0.78rem;
    line-height: 1.9;
    color: var(--dim);
    margin-bottom: 32px;
  }

  .card-features {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cf-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.74rem;
    color: var(--dim);
  }

  .cf-dot {
    width: 6px; height: 6px;
    background: var(--red);
    flex-shrink: 0;
  }

  /* ── CTA ── */
  .cta-section {
    text-align: center;
    padding: 160px 40px;
    background: var(--grey);
    border-top: 1px solid var(--mid);
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: 'E7';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40vw;
    color: rgba(240,237,230,0.02);
    pointer-events: none;
    line-height: 1;
    white-space: nowrap;
  }

  .cta-section .section-tag { justify-content: center; }

  .cta-section .section-tag::before { display: none; }

  .cta-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 8vw, 8rem);
    line-height: 0.9;
    margin-bottom: 32px;
  }

  .cta-title em {
    font-style: normal;
    color: var(--red);
  }

  .cta-sub {
    font-size: 0.8rem;
    color: var(--dim);
    max-width: 380px;
    margin: 0 auto 48px;
    line-height: 1.9;
  }

  .cta-form {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 440px;
    margin: 0 auto;
  }

  .cta-input {
    flex: 1;
    background: var(--black);
    border: 1px solid var(--mid);
    border-right: none;
    padding: 16px 20px;
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s;
  }

  .cta-input::placeholder { color: var(--dim); }

  .cta-input:focus { border-color: var(--red); }

  .cta-submit {
    background: var(--red);
    color: var(--black);
    border: none;
    padding: 16px 28px;
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: crosshair;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .cta-submit:hover { background: var(--orange); }

  /* ── FOOTER ── */
  footer {
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--mid);
  }

  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 0.15em;
  }

  .footer-logo span { color: var(--red); }

  .footer-copy {
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    color: var(--dim);
    text-transform: uppercase;
  }

  .footer-links {
    display: flex;
    gap: 24px;
    list-style: none;
  }

  .footer-links a {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--dim);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: var(--white); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* ── SCROLL REVEAL ── */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s, transform 0.7s;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    nav { padding: 16px 20px; }
    .nav-links { display: none; }
    .hero { padding: 100px 20px 40px; }
    .section { padding: 80px 20px; }
    .drop-grid { grid-template-columns: 1fr; }
    .levels-grid { grid-template-columns: 1fr; }
    .game-inner { grid-template-columns: 1fr; }
    .card-showcase { grid-template-columns: 1fr; }
    .hero-counter { gap: 24px; }
    footer { flex-direction: column; gap: 24px; text-align: center; }
    .cta-form { flex-direction: column; }
    .cta-input { border-right: 1px solid var(--mid); border-bottom: none; }
    .loyalty-card { transform: none; }
  }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">ÉCHELON<span>7</span></a>
  <ul class="nav-links">
    <li><a href="#drops">Drops</a></li>
    <li><a href="#membership">Membership</a></li>
    <li><a href="#game">Game</a></li>
    <li><a href="#card">Carte</a></li>
  </ul>
  <button class="nav-cta">Rejoindre</button>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div>
    <p class="hero-label">// Système d'appartenance — 2025</p>
    <h1 class="hero-title">
      ÉCHELON<br><em>SEPT</em>
    </h1>
    <p class="hero-sub">Pas une marque. Un système. Une communauté bâtie autour du drop exclusif, de la fidélité et du jeu. Monte d'un échelon.</p>
    <div class="hero-actions">
      <a href="#membership" class="btn-primary">Rejoindre le système</a>
      <a href="#drops" class="btn-secondary">Voir les drops</a>
    </div>
  </div>
  <div class="hero-counter">
    <div class="counter-item">
      <div class="counter-num">12<span>K+</span></div>
      <div class="counter-label">Membres actifs</div>
    </div>
    <div class="counter-item">
      <div class="counter-num">84<span>%</span></div>
      <div class="counter-label">Taux de rétention</div>
    </div>
    <div class="counter-item">
      <div class="counter-num">7<span>e</span></div>
      <div class="counter-label">Drop ce mois-ci</div>
    </div>
  </div>
</section>

<!-- TICKER -->
<div class="ticker">
  <div class="ticker-track">
    <span class="ticker-item">DROP MENSUEL EXCLUSIF <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">PIÈCES LIMITÉES <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">ZÉRO RUPTURE POUR LES MEMBRES <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">CARTE DE FIDÉLITÉ ÉVOLUTIVE <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">CLASSEMENT EN TEMPS RÉEL <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">MONTE D'UN ÉCHELON <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">DROP MENSUEL EXCLUSIF <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">PIÈCES LIMITÉES <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">ZÉRO RUPTURE POUR LES MEMBRES <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">CARTE DE FIDÉLITÉ ÉVOLUTIVE <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">CLASSEMENT EN TEMPS RÉEL <span class="ticker-sep">✦</span></span>
    <span class="ticker-item">MONTE D'UN ÉCHELON <span class="ticker-sep">✦</span></span>
  </div>
</div>

<!-- DROP SECTION -->
<section class="section drop-section" id="drops">
  <div class="section-tag">01 — Le Drop</div>
  <h2 class="section-title">UN DROP.<br>CHAQUE MOIS.</h2>
  <div class="drop-grid">
    <div class="drop-card reveal">
      <div class="drop-num">01</div>
      <div class="drop-icon">📦</div>
      <h3 class="drop-title">Drop Mensuel Exclusif</h3>
      <p class="drop-text">Chaque mois, une nouvelle collection en édition ultra-limitée. Disponible uniquement pour les membres actifs du système. Pas de restock. Pas de seconde chance.</p>
    </div>
    <div class="drop-card reveal">
      <div class="drop-num">02</div>
      <div class="drop-icon">⚡</div>
      <h3 class="drop-title">Accès Automatique</h3>
      <p class="drop-text">En tant que membre, tu es intégré automatiquement à chaque drop. Plus de stress, plus de battle. Ton échelon détermine ton accès prioritaire.</p>
    </div>
    <div class="drop-card reveal">
      <div class="drop-num">03</div>
      <div class="drop-icon">🎯</div>
      <h3 class="drop-title">Pièces Signature</h3>
      <p class="drop-text">Chaque pièce est conçue avec une identité forte. Streetwear pensé pour durer, pas pour disparaître. Des silhouettes qui définissent, pas qui suivent.</p>
    </div>
    <div class="drop-card reveal">
      <div class="drop-num">04</div>
      <div class="drop-icon">🔒</div>
      <h3 class="drop-title">Zéro Rupture</h3>
      <p class="drop-text">Ta taille est réservée. Ta commande est sécurisée. L'abonnement te protège de la rupture de stock. C'est l'avantage du système.</p>
    </div>
  </div>
</section>

<!-- MEMBERSHIP LEVELS -->
<section class="section levels-section" id="membership">
  <div class="section-tag">02 — Membership</div>
  <h2 class="section-title">TON NIVEAU.<br>TES RÈGLES.</h2>
  <div class="levels-grid">
    <div class="level-card reveal">
      <div class="level-badge">Niveau 1</div>
      <div class="level-num">01</div>
      <h3 class="level-name">Initié</h3>
      <p class="level-desc">Tu entres dans le système. L'accès de base au drop mensuel, la carte de fidélité activée.</p>
      <ul class="perks">
        <li class="perk-item">Accès drop mensuel</li>
        <li class="perk-item">Carte fidélité créée</li>
        <li class="perk-item">Accès communauté</li>
        <li class="perk-item">Newsletter exclusive</li>
      </ul>
    </div>
    <div class="level-card featured reveal">
      <div class="level-badge">Niveau 4 — Le plus populaire</div>
      <div class="level-num">04</div>
      <h3 class="level-name">Opérateur</h3>
      <p class="level-desc">Tu as prouvé ta loyauté. Les pièces prioritaires, les réductions game et l'accès early.</p>
      <ul class="perks">
        <li class="perk-item">Accès 24h avant le drop</li>
        <li class="perk-item">-15% sur les drops</li>
        <li class="perk-item">Rang game boosté x2</li>
        <li class="perk-item">Pièces exclusives niveau 4</li>
        <li class="perk-item">Carte GOLD débloquée</li>
      </ul>
    </div>
    <div class="level-card reveal">
      <div class="level-badge">Niveau 7</div>
      <div class="level-num">07</div>
      <h3 class="level-name">Échelon 7</h3>
      <p class="level-desc">Le sommet. Un cercle fermé. Des pièces que personne d'autre ne peut obtenir.</p>
      <ul class="perks">
        <li class="perk-item">Pièces one-of-a-kind</li>
        <li class="perk-item">-30% permanent</li>
        <li class="perk-item">Collab design communautaire</li>
        <li class="perk-item">Carte BLACK — statut ultime</li>
        <li class="perk-item">Invitations événements privés</li>
      </ul>
    </div>
  </div>
</section>

<!-- GAME SECTION -->
<section class="section game-section" id="game">
  <div class="game-inner">
    <div>
      <div class="leaderboard">
        <div class="lb-header">
          <span class="lb-title">CLASSEMENT MEMBRES</span>
          <span class="lb-live">Live</span>
        </div>
        <div class="lb-row top-1">
          <div class="lb-rank">#1</div>
          <div class="lb-name">XVRMN_K</div>
          <div class="lb-badge">ÉCHELON 7</div>
          <div class="lb-pts">14 820</div>
        </div>
        <div class="lb-row top-2">
          <div class="lb-rank">#2</div>
          <div class="lb-name">drp.sole</div>
          <div class="lb-badge">NIVEAU 6</div>
          <div class="lb-pts">11 340</div>
        </div>
        <div class="lb-row top-3">
          <div class="lb-rank">#3</div>
          <div class="lb-name">rkstr__</div>
          <div class="lb-badge">NIVEAU 6</div>
          <div class="lb-pts">9 870</div>
        </div>
        <div class="lb-row">
          <div class="lb-rank">#4</div>
          <div class="lb-name">bloc_noir</div>
          <div class="lb-badge">NIVEAU 5</div>
          <div class="lb-pts">8 210</div>
        </div>
        <div class="lb-row">
          <div class="lb-rank">#5</div>
          <div class="lb-name">ymg.exe</div>
          <div class="lb-badge">NIVEAU 4</div>
          <div class="lb-pts">6 990</div>
        </div>
        <div class="lb-row" style="opacity:0.5;">
          <div class="lb-rank">—</div>
          <div class="lb-name">Toi ?</div>
          <div class="lb-badge">INITIÉÉ</div>
          <div class="lb-pts">0</div>
        </div>
      </div>
    </div>
    <div class="game-content">
      <div class="section-tag">03 — Le Jeu</div>
      <h2 class="section-title" style="margin-bottom:24px;">JOUE.<br>MONTE.<br>GAGNE.</h2>
      <p style="font-size:0.78rem; line-height:1.9; color:var(--dim); margin-bottom: 8px;">Le jeu membres transforme ta fidélité en avantages concrets. Chaque action te rapporte des points. Chaque point te rapproche du sommet.</p>
      <div class="game-perks">
        <div class="game-perk">
          <div class="gp-icon">🏆</div>
          <div>
            <div class="gp-title">Classement en temps réel</div>
            <div class="gp-desc">Vois ta position parmi tous les membres. La compétition est permanente, les récompenses aussi.</div>
          </div>
        </div>
        <div class="game-perk">
          <div class="gp-icon">💥</div>
          <div>
            <div class="gp-title">Réductions progressives</div>
            <div class="gp-desc">Plus tu joues, plus tu montes. Plus tu montes, plus tes réductions augmentent. Jusqu'à -30%.</div>
          </div>
        </div>
        <div class="game-perk">
          <div class="gp-icon">🎁</div>
          <div>
            <div class="gp-title">Récompenses exclusives</div>
            <div class="gp-desc">Des pièces, des accès, des invitations. Les meilleurs joueurs reçoivent ce que les autres ne peuvent pas acheter.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CARD SECTION -->
<section class="section" id="card">
  <div class="section-tag">04 — La Carte</div>
  <h2 class="section-title">ELLE ÉVOLUE<br>AVEC TOI.</h2>
  <div class="card-showcase">
    <div class="loyalty-card">
      <div class="card-logo">ÉCHELON<span>7</span></div>
      <div class="card-chip"></div>
      <div class="card-mid">
        <div>
          <div class="card-level">NVL 4</div>
          <div class="card-level-sub">Opérateur</div>
        </div>
        <div class="card-progress-wrap">
          <div class="card-progress-label">
            <span>Vers Niveau 5</span>
            <span>62%</span>
          </div>
          <div class="card-progress-bar">
            <div class="card-progress-fill"></div>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-num">E7•••• •••• 4782</div>
        <div class="card-pts">
          <div class="card-pts-num">8 420</div>
          <div class="card-pts-label">Points</div>
        </div>
      </div>
    </div>
    <div class="card-info reveal">
      <h3>Ta carte. Ton identité dans le système.</h3>
      <p>Créée dès ton inscription, elle porte ton niveau, tes points et ton histoire avec Échelon 7. Elle évolue visuellement à chaque palier franchi.</p>
      <div class="card-features">
        <div class="cf-item">
          <div class="cf-dot"></div>
          <span>Créée automatiquement à l'inscription</span>
        </div>
        <div class="cf-item">
          <div class="cf-dot"></div>
          <span>Design qui évolue avec ton niveau</span>
        </div>
        <div class="cf-item">
          <div class="cf-dot"></div>
          <span>INITIÉÉ → GOLD → BLACK selon ton rang</span>
        </div>
        <div class="cf-item">
          <div class="cf-dot"></div>
          <span>Avantages exclusifs activés par la carte</span>
        </div>
        <div class="cf-item">
          <div class="cf-dot"></div>
          <span>Points accumulés sur chaque drop</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="section-tag">05 — L'Invitation</div>
  <h2 class="cta-title">MONTE<br>D'UN <em>ÉCHELON.</em></h2>
  <p class="cta-sub">Laisse ton email. On t'intègre au système. Le prochain drop arrive dans moins de 30 jours.</p>
  <div class="cta-form">
    <input type="email" class="cta-input" placeholder="ton@email.com">
    <button class="cta-submit">Rejoindre →</button>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">ÉCHELON<span>7</span></div>
  <p class="footer-copy">© 2025 Échelon 7 — Tous droits réservés</p>
  <ul class="footer-links">
    <li><a href="#">Instagram</a></li>
    <li><a href="#">Confidentialité</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</footer>

<script>
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // Card tilt on mouse move
  const card = document.querySelector('.loyalty-card');
  if (card) {
    document.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      card.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;
    });
  }

  // Counter animation
  function animateCounter(el, end, suffix) {
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      el.textContent = Math.floor(start).toLocaleString('fr') + suffix;
      if (start >= end) clearInterval(timer);
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const nums = e.target.querySelectorAll('.counter-num');
        animateCounter(nums[0], 12, 'K+');
        animateCounter(nums[1], 84, '%');
        nums[2].textContent = '7e';
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  const heroCounter = document.querySelector('.hero-counter');
  if (heroCounter) counterObserver.observe(heroCounter);
</script>
</body>
</html>
