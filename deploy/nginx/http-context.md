# Shared nginx.conf changes (http context)

`/etc/nginx/nginx.conf` is shared by every site on the VPS, so it is not
committed here in full — only the two lines this project changed. Both were
already present in Ubuntu's default file, commented out.

```diff
--- /etc/nginx/nginx.conf
@@ line 21 @@
-	# server_tokens off;
+	server_tokens off;

@@ line 53 @@
-	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
+	gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

- **`server_tokens off`** — stops the `Server:` header advertising
  `nginx/1.24.0 (Ubuntu)`.
- **`gzip_types`** — `gzip on` was already set, but with no `gzip_types` only
  `text/html` was compressed. This extends it to CSS/JS/XML/JSON
  (`styles.css` drops 14.2 KB -> 4.5 KB).

Both affect all sites on the box. Neither changes routing or TLS.
