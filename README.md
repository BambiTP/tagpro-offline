# TagPro Offline

Single-player TagPro that runs entirely in your browser. There's no server and no multiplayer:
the game engine and the bots run in the page, so it works on GitHub Pages (or any static host).

**Play:** open the site, pick a map, mode (Capture the Flag, Gravity or Eggball), your team and
how many bots, then press Play. With no bots you have the map to yourself to practice.

## Maps

- **Maps that come with the site** are in `maps/` (`<key>.png` + `<key>.json`); `maps/rotation.json`
  is the pool "Random" picks from.
- **Fortunate Maps, from the home page:** pick "Fortunate Maps ID..." in the Map list and enter
  a map number or link. Browsers only let a page read files from another site if that site
  allows it, and Fortunate Maps doesn't, so the page also tries each proxy listed in
  `config.json` (`"fortunateMapsProxies": ["https://cors.bambitp.workers.dev/?url="]`: each is a
  prefix the encoded Fortunate Maps URL is added to, and must answer with
  `Access-Control-Allow-Origin`). With none that works, it
  gives you links to the two files to save and add under "Add your own map files". Maps added
  this way are kept in your browser only.
- **Fortunate Maps, for everyone:** in this repo's **Actions** tab, run **Add maps** and enter
  map numbers or links (e.g. `69860 12345`). The workflow downloads them into `maps/`, commits
  them, and they show up for everyone once GitHub Pages redeploys. By hand:
  `node tools/add-maps.js 69860 12345`.

## Hosting on GitHub Pages

Settings -> Pages -> Build and deployment: **Deploy from a branch**, branch `main`, folder `/ (root)`.

## Where it comes from

This site is built from [BambiTP/tagpro-local](https://github.com/BambiTP/tagpro-local) with
`node tools/build-static.js <this repo>`: the real TagPro client pages and assets, plus that
repo's recoded game engine (`engine/`) and bots. Don't edit the generated files here; change
them there and rebuild. `maps/` is kept between builds.

Not included: replays, music, accounts and everything multiplayer.
