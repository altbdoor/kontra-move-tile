import { Scene, Sprite } from 'kontra';

export const getGrid = (width: number, height: number, size: number) => {
    const gridScene = Scene({
        id: 'grid',
        objects: [],
    });
    const gridDefaults: Partial<Sprite> = {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        color: 'blue',
        opacity: 0.5,
    };

    gridScene.add(
        Array(width / size)
            .fill(0)
            .map((_, idx) => {
                return Sprite({
                    ...gridDefaults,
                    x: (idx + 1) * size,
                    height,
                });
            })
    );

    gridScene.add(
        Array(height / size)
            .fill(0)
            .map((_, idx) => {
                return Sprite({
                    ...gridDefaults,
                    y: (idx + 1) * size,
                    width,
                });
            })
    );

    return gridScene;
};
