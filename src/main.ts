import { GameLoop, init, initKeys, load } from 'kontra';
import { getGrid } from './components/grid';
import { getPlayer } from './components/player';
import { IMAGE } from './components/resource';
import { getTile } from './components/tile';
import './style.css';

init('main__canvas');
initKeys();

async function main() {
    await load(...Object.values(IMAGE));

    const tile = getTile();
    const player = getPlayer();
    const grid = getGrid(320, 320, 32);

    const loop = GameLoop({
        update() {
            player.customUpdate(tile);
        },
        render() {
            tile.render();
            grid.render();
            player.render();
        },
    });
    loop.start();
}
main();
