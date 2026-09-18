# Home hero — version history

Snapshots of `index.html`'s hero section (`<section class="hero">...</section>`), saved before each content revision. When asked to "bring previous," restore the most recent version block below into `index.html`.

---

## Version 1 — before Sept 2026 content-polish pass (redundant opener / 20+ vs 25+ / personality line placement / CSCS jargon / $1.8M context)

```html
<section class="hero"><div class="wrap hero-grid">
  <div>
    <div class="kicker">AI Technical Product Manager · Product Owner · Senior TPM / Delivery Lead</div>
    <h1>I ship <em>GenAI products</em> — and lead the delivery behind them</h1>
    <p class="lead">AI Technical Product Manager with 20+ years across Telecom, Healthcare, Retail &amp; Analytics, eMarketing, and Construction. I own roadmaps and releases — and personally build production GenAI apps with Claude Code, Cursor AI, and Google AI Studio.</p>
    <p class="personality">My favorite co-worker is Claude Code. My second favorite is whoever reviews my PRs without complaining.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/projects/">View Projects</a>
      <a class="btn btn-secondary" href="/contact/">Contact Me</a>
      <a class="btn btn-ghost" href="/assets/Sami-Ullah-Khan-Resume.pdf" download="Sami-Ullah-Khan-Resume.pdf">Download Resume</a>
    </div>
  </div>
  <div class="hero-side">
    <div class="hero-photo">
      <div class="avatar-wrap">
        <img class="avatar" src="/assets/sami-ullah-khan.png" alt="Sami Ullah Khan, AI Technical Product Manager" width="210" height="210" loading="eager"/>
        <div class="avatar-ring" aria-hidden="true"></div>
      </div>
    </div>
    <aside class="hero-card" aria-label="Impact snapshot">
      <h3>Impact snapshot</h3>
      <div class="metric"><strong>CSCS (UK)</strong><span>35% faster · £1.5M+ on time</span></div>
      <div class="metric"><strong>Veroxos SaaS</strong><span>PM/PO · −60% manual reporting</span></div>
      <div class="metric"><strong>Panacea EHR</strong><span>100% MU Stage-2 · $450K+ avoided</span></div>
      <div class="metric"><strong>GenAI products</strong><span>5 led &amp; built · 3 live</span></div>
    </aside>
  </div>
</div>
<div class="wrap stats" aria-label="Key stats">
  <div class="stat"><b>20+</b><span>years shipping software</span></div>
  <div class="stat"><b>30+</b><span>people led cross-functionally</span></div>
  <div class="stat"><b>$1.8M</b><span>program budgets owned</span></div>
  <div class="stat"><b>~22%</b><span>faster cycles with GenAI</span></div>
</div>
</section>
```

**Reason for revision:** redundant "AI Technical Product Manager" opener (repeats the eyebrow pill), "20+ years" undersold the actual ~25-26 year career span, personality line sat before the CTAs ahead of any credibility signal, "CSCS (UK)" was unexplained jargon, and "$1.8M program budgets owned" read as a career-wide figure when it's specifically the StableLogic-era peak.

---

## Version 2 — after the content-polish pass above

```html
<section class="hero"><div class="wrap hero-grid">
  <div>
    <div class="kicker">AI Technical Product Manager · Product Owner · Senior TPM / Delivery Lead</div>
    <h1>I ship <em>GenAI products</em> — and lead the delivery behind them</h1>
    <p class="lead">25+ years across Telecom, Healthcare, Retail &amp; Analytics, eMarketing, and Construction — owning roadmaps and releases, and personally building production GenAI apps with Claude Code, Cursor AI, and Google AI Studio.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/projects/">View Projects</a>
      <a class="btn btn-secondary" href="/contact/">Contact Me</a>
      <a class="btn btn-ghost" href="/assets/Sami-Ullah-Khan-Resume.pdf" download="Sami-Ullah-Khan-Resume.pdf">Download Resume</a>
    </div>
    <p class="personality">My favorite co-worker is Claude Code. My second favorite is whoever reviews my PRs without complaining.</p>
  </div>
  <div class="hero-side">
    <div class="hero-photo">
      <div class="avatar-wrap">
        <img class="avatar" src="/assets/sami-ullah-khan.png" alt="Sami Ullah Khan, AI Technical Product Manager" width="210" height="210" loading="eager"/>
        <div class="avatar-ring" aria-hidden="true"></div>
      </div>
    </div>
    <aside class="hero-card" aria-label="Impact snapshot">
      <h3>Impact snapshot</h3>
      <div class="metric"><strong>CSCS (UK construction)</strong><span>35% faster · £1.5M+ on time</span></div>
      <div class="metric"><strong>Veroxos SaaS</strong><span>PM/PO · −60% manual reporting</span></div>
      <div class="metric"><strong>Panacea EHR</strong><span>100% MU Stage-2 · $450K+ avoided</span></div>
      <div class="metric"><strong>GenAI products</strong><span>5 led &amp; built · 3 live</span></div>
    </aside>
  </div>
</div>
<div class="wrap stats" aria-label="Key stats">
  <div class="stat"><b>25+</b><span>years shipping software</span></div>
  <div class="stat"><b>30+</b><span>people led cross-functionally</span></div>
  <div class="stat"><b>$1.8M</b><span>peak program budget (StableLogic)</span></div>
  <div class="stat"><b>~22%</b><span>faster cycles with GenAI</span></div>
</div>
</section>
```

**Reason for revision:** user felt the "(StableLogic)" qualifier on the $1.8M stat wasn't worth calling out in a compact stat tile — reverting to a plain "peak program budget" without naming the employer.

---

## Version 3 — after dropping "(StableLogic)" qualifier

```html
<section class="hero"><div class="wrap hero-grid">
  <div>
    <div class="kicker">AI Technical Product Manager · Product Owner · Senior TPM / Delivery Lead</div>
    <h1>I ship <em>GenAI products</em> — and lead the delivery behind them</h1>
    <p class="lead">25+ years across Telecom, Healthcare, Retail &amp; Analytics, eMarketing, and Construction — owning roadmaps and releases, and personally building production GenAI apps with Claude Code, Cursor AI, and Google AI Studio.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/projects/">View Projects</a>
      <a class="btn btn-secondary" href="/contact/">Contact Me</a>
      <a class="btn btn-ghost" href="/assets/Sami-Ullah-Khan-Resume.pdf" download="Sami-Ullah-Khan-Resume.pdf">Download Resume</a>
    </div>
    <p class="personality">My favorite co-worker is Claude Code. My second favorite is whoever reviews my PRs without complaining.</p>
  </div>
  <div class="hero-side">
    <div class="hero-photo">
      <div class="avatar-wrap">
        <img class="avatar" src="/assets/sami-ullah-khan.png" alt="Sami Ullah Khan, AI Technical Product Manager" width="210" height="210" loading="eager"/>
        <div class="avatar-ring" aria-hidden="true"></div>
      </div>
    </div>
    <aside class="hero-card" aria-label="Impact snapshot">
      <h3>Impact snapshot</h3>
      <div class="metric"><strong>CSCS (UK construction)</strong><span>35% faster · £1.5M+ on time</span></div>
      <div class="metric"><strong>Veroxos SaaS</strong><span>PM/PO · −60% manual reporting</span></div>
      <div class="metric"><strong>Panacea EHR</strong><span>100% MU Stage-2 · $450K+ avoided</span></div>
      <div class="metric"><strong>GenAI products</strong><span>5 led &amp; built · 3 live</span></div>
    </aside>
  </div>
</div>
<div class="wrap stats" aria-label="Key stats">
  <div class="stat"><b>25+</b><span>years shipping software</span></div>
  <div class="stat"><b>30+</b><span>people led cross-functionally</span></div>
  <div class="stat"><b>$1.8M</b><span>peak program budget</span></div>
  <div class="stat"><b>~22%</b><span>faster cycles with GenAI</span></div>
</div>
</section>
```

**Reason for revision:** trimming the lead paragraph's tool list. "Cursor AI" was already stale here (removed earlier from the About page's GenAI Tooling skill tiles but never cleaned up from this sentence). "Google AI Studio" is still a real, current skill but is dropped from this specific sentence for concision — the full tool list still lives in "What I Bring" below and on the About page's skill grid, so no information is lost, just decluttered from the hero's first sentence. Only "Claude Code" remains as the flagship example.
