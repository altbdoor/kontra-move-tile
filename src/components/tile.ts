import { TileEngine, imageAssets } from 'kontra';
import { IMAGE, LAYERS } from './resource';

export const getTile = () => {
    return TileEngine({
        tilewidth: 32,
        tileheight: 32,
        width: 10,
        height: 10,
        tilesets: [
            {
                firstgid: 1,
                image: imageAssets[IMAGE.TILE],
            },
        ],
        layers: [
            {
                name: LAYERS.FLOOR,
                data: Array(100).fill(10),
            },
            {
                name: LAYERS.WALL,
                data: [
                    ...Array(10).fill(8),
                    ...Array(4)
                        .fill(0)
                        .map(() => [8, 0, 0, 0, 0, 0, 0, 0, 0, 8])
                        .flat(),
                    ...[8, 0, 0, 0, 8, 24, 0, 0, 0, 8],
                    ...Array(3)
                        .fill(0)
                        .map(() => [8, 0, 0, 0, 0, 0, 0, 0, 0, 8])
                        .flat(),
                    ...Array(10).fill(8),
                ],
            },
        ],
    });
};
