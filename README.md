# TagPro Offline

Single-player TagPro that runs entirely in your browser. There's no server and no multiplayer:
the game engine and the bots run in the page, so it works on GitHub Pages (or any static host).

**Play:** open the site, pick a map, mode (Capture the Flag, Gravity or Eggball), your team and
how many bots, then press Play. With no bots you have the map to yourself to practice.

## Maps

- **Maps that come with the site** are in `maps/` (`<key>.png` + `<key>.json`); `maps/rotation.json`
  is the pool "Random" picks from.
- **Fortunate Maps, from the home page:** enter a map number or link under "Add a map from
  Fortunate Maps". If your browser isn't allowed to download it directly, the page gives you
  links to the two files; save them and add them under "Add your own map files". Maps you add
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
