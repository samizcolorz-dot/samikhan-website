# Footer — version history

Snapshots of the `<footer class="footer">...</footer>` block, saved before each revision. When asked to "bring previous," restore the most recent version block below (applies to all 6 pages, since the footer is shared markup).

---

## Version 1 — credentials line + social icon row

```html
<footer class="footer"><div class="wrap footer-inner">
  <div>
    <p><strong>Sami Ullah Khan</strong> · AI Technical Product Manager · Product Owner · Senior TPM / Delivery Lead · GenAI Product Builder</p>
    <p>Systems Ltd (2026 – Present) · Islamabad · Remote-friendly · LUMS PM (2015) · CBAP (2014) · CMMI (2007)</p>
  </div>
  <div class="social-row" aria-label="Social links">
    <a class="social-icon" href="mailto:samiukhan@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg></a>
    <a class="social-icon" href="tel:+923215111946" aria-label="Phone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
    <a class="social-icon" href="https://www.linkedin.com/in/samikhan946/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
  </div>
</div></footer>
```

**Reason for revision:** switching to the minimal footer shown in a Google Stitch mockup (copyright line + quick links + "Built with Claude Code" tag), per explicit user choice to replace rather than keep or append.

---

## Version 2 — minimal footer (copyright + quick links + "Built with Claude Code")

```html
<footer class="footer"><div class="wrap footer-inner">
  <p class="footer-copy">© 2026 Sami Ullah Khan · AI TPM &amp; Technical Product Leader.</p>
  <nav class="footer-links" aria-label="Footer">
    <a href="/projects/">Projects</a>
    <a href="/experience/">Experience</a>
    <a href="/contact/">Get In Touch</a>
    <span class="footer-tag">Built with Claude Code</span>
  </nav>
</div></footer>
```

**Reason for revision:** a later Stitch mockup reverted to the verbose style; user confirmed they want to go back to it. Reverting to Version 1's markup (credentials line + social icon row).
