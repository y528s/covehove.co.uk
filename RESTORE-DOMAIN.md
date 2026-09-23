# Putting covehove.co.uk back on

The `CNAME` file has been temporarily renamed to `CNAME.disabled` so the site can be
previewed at **https://y528s.github.io/covehove.co.uk/** while DNS still points at
Squarespace's "Coming Soon" page.

## When the DNS change has been made

1. Rename `CNAME.disabled` back to `CNAME` (on GitHub: open the file → pencil icon →
   change the filename at the top → Commit changes).
2. Repo → **Settings → Pages → Custom domain** → enter `covehove.co.uk` → **Save**.
3. Wait for the DNS check to pass and the certificate to be issued — usually minutes,
   occasionally up to 24 hours.
4. **Only then** tick **Enforce HTTPS**. Ticking it early makes the site unreachable
   until the certificate arrives.

## The DNS change itself

covehove.co.uk is registered with **Squarespace**, and Squarespace is also running its
DNS (`nse1-4.squarespacedns.com`). So the records are changed inside Squarespace, not at
a separate registrar.

In Squarespace: **Domains → covehove.co.uk → DNS Settings**.

You may first have to **disconnect the domain from the Squarespace site** it is attached
to — that is what is putting the "Coming Soon" page up, and Squarespace locks the
relevant records while it is connected.

Then remove Squarespace's default records for `@` and `www`, and add:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `y528s.github.io.` |

Leave any MX or TXT records alone — those are email and domain verification, nothing to
do with the website.

## Checking it worked

From a terminal:

```
dig +short covehove.co.uk
```

You want the four `185.199.…` addresses. While it still shows `198.185.159.…` or
`198.49.23.…`, it is still pointing at Squarespace.
