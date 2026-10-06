# Boost drill AI

A reinforcement-learning agent that learns to get to a target as fast as possible, using a boost or a
bomb when that's quicker. It is trained headless on this site's own game engine (`engine/game.js`:
the same Box2D physics, boosts and explosions as the game), then runs in the browser or attached to
any player in a game room.

Each episode puts the ball, **one boost or bomb** and a **target** at random places. The agent
presses arrow keys (8 directions or none, 20 decisions a second) and learns that:

- a **boost** fires you along the direction you're moving when you touch it (7.5 m/s, 3x top speed),
  so you line up behind it, aimed at the target;
- a **bomb** kicks you away from its centre (up to ~9.6 m/s), so you go past it and back into it from
  the target's side.

No dependencies: plain JavaScript (Node 18+ to train, any modern browser to watch).

## Files

| File | What it is |
| --- | --- |
| `env.js` | The environment: a game room run on a simulated clock (`reset()`, `step(action)`), the observation, the reward, and a path finder for maps with walls. Node and browser. |
| `nn.js` | A small neural net (tanh MLP with backprop) and Adam. |
| `train.js` | PPO training on every CPU core (worker threads). Writes `models/boost-policy.json`. |
| `evaluate.js` | Plays the same random episodes with the agent and with "steer straight at the target", and compares them. |
| `policy.js` | Loads a trained model. `BoostDriver` attaches it to any player in a `GameRoom`. |
| `attach-demo.js` | Attaches the agent to a player on this site's real maps and sends it to the flag. |
| `png.js` | A small PNG decoder so Node can read `maps/*.png`. |
| `index.html` | The viewer: watch the agent, compare it with the baseline, or race it yourself. |

## Train (headless)

```sh
node ml/train.js                       # 8M steps, ~30 min on 4 cores; saves ml/models/boost-policy.json
node ml/train.js --resume --blocks 6   # keep training, with random wall blocks in the arena
node ml/evaluate.js                    # agent vs straight line, 1000 episodes
node ml/evaluate.js --blocks 6 --onpath 0
node ml/attach-demo.js 69860 77073     # on real maps, to the flag
```

Options for `train.js`: `--steps`, `--pickup boost|bomb|both`, `--blocks N` (random wall blocks),
`--onpath X` (chance the pickup is put on the way to the target, a curriculum so the agent runs into
pickups and learns what they do; default 0.5), `--size` (arena tiles), `--ent` (exploration),
`--lr`, `--workers`, `--hidden`, `--seed`, `--out FILE`, `--resume`. It logs the reach rate, the
average time and how often the pickup was used, and every 25 updates it evaluates against the
straight-line driver and keeps the model if it's the best so far.

**Observation** (19 numbers): velocity, where the target is (or the next waypoint when a wall is in
the way), where the pickup is, its kind and whether it's still there, and the distance to the nearest
wall in 8 directions. **Reward**: -0.01 a decision (time), +0.2 per metre closer to the target (along
the path), +2 for getting there.

## Watch it (browser)

Open `ml/` on the site (e.g. `https://<you>.github.io/tagpro-offline/ml/`, or serve the repo with
`python3 -m http.server` and open `http://localhost:8000/ml/`). Pick the driver (AI, straight line or
you with the arrow keys), boost / bomb, an open arena, an arena with wall blocks, or one of this site's
maps. "Replay layout" runs the same layout again, so you can race the AI.

## Attach it to a game

`BoostDriver` drives any player in a `GameRoom` (the game's server object, e.g. in `engine/worker.js`)
to a point, around walls, using the nearest boost or bomb when that's faster:

```js
const { Policy, BoostDriver } = require('./ml/policy'); // browser: TPBoostPolicy, after nn.js + env.js
const driver = new BoostDriver(new Policy(model), room, room.players[id]);
driver.setTarget({ x: tileX * 0.4, y: tileY * 0.4 });  // metres; null to stop
// once per room.step():
driver.tick();            // presses keys through room.handle(), like a client
if (driver.arrived()) ...
```

It knows walls, boosts and bombs. It doesn't know about spikes, gates or other players, so on a real
map it can roll into a spike.
