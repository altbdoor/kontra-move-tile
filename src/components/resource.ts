export enum IMAGE {
    // https://github.com/photonstorm/phaser3-examples/tree/master/public/assets

    // https://labs.phaser.io/view.html?src=src/textures\sprite%20using%20tilemap%20texture.js
    TILE = './fantasy-tiles.png',

    // https://www.spriters-resource.com/game_boy_gbc/pokemongoldsilver/sheet/9077/
    PLAYER = './player.png',
}

export enum LAYERS {
    FLOOR = 'floor',
    WALL = 'wall',
}

export enum PLAYERANIM {
    IDLEUP = 'idle_up',
    IDLEDOWN = 'idle_down',
    IDLELEFT = 'idle_left',
    IDLERIGHT = 'idle_right',
    MOVEUP = 'move_up',
    MOVEDOWN = 'move_down',
    MOVELEFT = 'move_left',
    MOVERIGHT = 'move_right',
}
