# Trello Card Age Power-Up

Displays each card's age on the front of the card in board view. Two badges:

- **Age** — days since the card was created. Color-coded by week:
  - <1 week — green
  - 1–4 weeks — lime
  - 4–8 weeks — yellow
  - 8–12 weeks — orange
  - 12+ weeks — red
- **Last active** (clock icon) — days since the card was last touched (edited, moved, commented).

No backend, no tracking — pure static client code.

## Install on a Trello workspace

1. Visit <https://trello.com/power-ups/admin> and pick the workspace you want to install it in.
2. **New Power-Up** → fill in:
   - **Iframe Connector URL**: `https://jwrdcllc.github.io/trello_card_age/`
   - **Workspace**: your workspace
3. On the new Power-Up's **Capabilities** tab, enable **card-badges** and save.
4. On any board in that workspace, **Power-Ups → Add Power-Up** → find this one in the **Custom** section.

Badges appear on cards in the board view. They refresh every 10 minutes automatically.

## How the age is calculated

The "age" badge derives the creation date from the card ID — Trello card IDs are MongoDB ObjectIds whose first 8 hex characters are a Unix timestamp. No API call required.

The "last active" badge reads `dateLastActivity` from the Power-Up client library.

## Local development

```sh
# Serve the directory over HTTP for the iframe to load
python3 -m http.server 8000
# In another shell, expose it over HTTPS:
ngrok http 8000
# Use the ngrok URL as the connector in the Power-Up admin.
```

## License

MIT — see `LICENSE`.
