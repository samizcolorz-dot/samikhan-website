# Deployment

The live site is served by **nginx on a VPS**, not by Netlify or Vercel.

| | |
|---|---|
| Host | `13.140.159.15` (Ubuntu 24.04, nginx 1.24.0) |
| Web root | `/var/www/samikhan-website` |
| Domains | `samikhanapps.com` (canonical), `www.samikhanapps.com` -> 301 |
| TLS | Let's Encrypt, `/etc/letsencrypt/live/samikhanapps.com/`, certbot auto-renews |
| SSH | `ssh -i ~/.ssh/samikhanapps_template_deploy root@13.140.159.15` |

> `netlify.toml` and `vercel.json` in the repo root are leftovers from an
> earlier hosting plan. They are **not** what serves the site. The legacy
> `.html` redirects they describe are implemented in the nginx config instead.

## Files here

| Path | Deploys to |
|---|---|
| `nginx/samikhan-website.conf` | `/etc/nginx/sites-available/samikhan-website` (symlinked into `sites-enabled/`) |
| `nginx/http-context.md` | Two one-line edits to the shared `/etc/nginx/nginx.conf` |

Keep `nginx/samikhan-website.conf` in sync whenever the server config changes,
so the repo stays the source of truth.

## Deploy the site files

From the repo root:

```bash
tar -czf - index.html css sitemap.xml robots.txt favicon.ico apple-touch-icon.png \
    about community contact experience projects assets \
    *.html \
  | ssh -i ~/.ssh/samikhanapps_template_deploy root@13.140.159.15 \
    "tar -xzf - -C /var/www/samikhan-website \
     && chown -R root:root /var/www/samikhan-website \
     && find /var/www/samikhan-website -type d -exec chmod 755 {} \; \
     && find /var/www/samikhan-website -type f -exec chmod 644 {} \;"
```

Back up the web root first for anything non-trivial:

```bash
ssh -i ~/.ssh/samikhanapps_template_deploy root@13.140.159.15 \
  "cd /var/www && tar -czf /root/samikhan-website-backup-\$(date +%Y%m%d-%H%M%S).tar.gz samikhan-website"
```

## Deploy the nginx config

```bash
scp -i ~/.ssh/samikhanapps_template_deploy deploy/nginx/samikhan-website.conf \
    root@13.140.159.15:/etc/nginx/sites-available/samikhan-website

# Always test before reloading — a bad config takes down all six sites on this box.
ssh -i ~/.ssh/samikhanapps_template_deploy root@13.140.159.15 "nginx -t && systemctl reload nginx"
```

## Gotchas

- **Port 443 is shared** with `tasks.`, `finance.`, `medical.`, `template.` and
  `reports.samikhanapps.com`. A broken config or a reload failure affects all of
  them, so `nginx -t` is not optional. Adding `http2` to only this site's
  `listen` lines triggers "protocol options redefined" warnings — it has to be
  all six blocks or none.
- **Don't use `location = /index.html { return 301 /; }`.** The `index`
  directive internally rewrites `/` to `/index.html`, which re-matches that
  block and causes an infinite redirect loop. The config matches on
  `$request_uri` instead, which internal rewrites don't change.
- **`add_header` inside a `location` replaces the server-level set** rather than
  adding to it. The security headers are therefore repeated inside the static
  asset `location` block. If you add another `location` with `add_header`,
  repeat them there too.
- **`styles.css` is cached for a year (`immutable`).** The HTML references
  `/css/styles.css?v=2`; bump that query string whenever the CSS changes, or
  returning visitors get new HTML with stale CSS.
- **HSTS is `max-age=31536000`** (1 year), raised 2026-09-27 after verifying
  certbot auto-renewal works (`certbot renew --dry-run` passed). Do not add
  `preload` unless every subdomain is committed to HTTPS-only permanently.
  Note this cannot be walked back for clients that already cached it.

## After deploying

In Search Console: resubmit `sitemap.xml` and request indexing of the home page.
Bump `<lastmod>` in `sitemap.xml` and `dateModified` in the JSON-LD when content
changes.
