import { Sprite, SpriteSheet, TileEngine, imageAssets, keyPressed } from 'kontra';
import { IMAGE, LAYERS, PLAYERANIM } from './resource';

interface SpritePlayer extends Sprite {
    // extend Sprite with our own state, prefixed with `st`
    stTargetX: number;
    stTargetY: number;
    stIsMoving: boolean;
    stMoveSpeed: number;
    customUpdate: (tile: TileEngine) => void;
}

export const getPlayer = () => {
    const sheet = SpriteSheet({
        image: imageAssets[IMAGE.PLAYER],
        frameWidth: 32,
        frameHeight: 32,
        animations: {
            [PLAYERANIM.IDLEUP]: {
                frames: [4],
                loop: false,
            },
            [PLAYERANIM.IDLEDOWN]: {
                frames: [1],
                loop: false,
            },
            [PLAYERANIM.IDLELEFT]: {
                frames: [6],
                loop: false,
            },
            [PLAYERANIM.IDLERIGHT]: {
                frames: [8],
                loop: false,
            },
            [PLAYERANIM.MOVEUP]: {
                frames: [3, 4, 5, 4],
                frameRate: 6,
            },
            [PLAYERANIM.MOVEDOWN]: {
                frames: [0, 1, 2, 1],
                frameRate: 6,
            },
            [PLAYERANIM.MOVELEFT]: {
                frames: [6, 7],
                frameRate: 6,
            },
            [PLAYERANIM.MOVERIGHT]: {
                frames: [8, 9],
                frameRate: 6,
            },
        },
    });

    const player = Sprite({
        x: 32 * 3,
        y: 32 * 3,
        width: 32,
        height: 32,
        stTargetX: 0,
        stTargetY: 0,
        stIsMoving: false,
        stMoveSpeed: 2,
        animations: sheet.animations,
    }) as SpritePlayer;

    // extend update with our custom logic
    player.customUpdate = (tile) => {
        if (player.stIsMoving && player.x === player.stTargetX && player.y === player.stTargetY) {
            player.stIsMoving = false;
            player.dy = 0;
            player.dx = 0;

            if (player.currentAnimation.name === PLAYERANIM.MOVERIGHT) {
                player.playAnimation(PLAYERANIM.IDLERIGHT);
            } else if (player.currentAnimation.name === PLAYERANIM.MOVELEFT) {
                player.playAnimation(PLAYERANIM.IDLELEFT);
            } else if (player.currentAnimation.name === PLAYERANIM.MOVEDOWN) {
                player.playAnimation(PLAYERANIM.IDLEDOWN);
            } else if (player.currentAnimation.name === PLAYERANIM.MOVEUP) {
                player.playAnimation(PLAYERANIM.IDLEUP);
            }
        }

        if (!player.stIsMoving && keyPressed(['arrowup', 'arrowdown', 'arrowleft', 'arrowright'])) {
            // copy over the current position
            player.stTargetX = player.x;
            player.stTargetY = player.y;

            // update target and handle idle animation
            if (keyPressed('arrowup')) {
                player.stTargetY = player.y - 32;
                player.playAnimation(PLAYERANIM.IDLEUP);
            } else if (keyPressed('arrowdown')) {
                player.stTargetY = player.y + 32;
                player.playAnimation(PLAYERANIM.IDLEDOWN);
            } else if (keyPressed('arrowleft')) {
                player.stTargetX = player.x - 32;
                player.playAnimation(PLAYERANIM.IDLELEFT);
            } else if (keyPressed('arrowright')) {
                player.stTargetX = player.x + 32;
                player.playAnimation(PLAYERANIM.IDLERIGHT);
            }

            // create an off by one pixel target to check for collision
            const offPixelTarget = {
                width: player.width - 2,
                height: player.height - 2,
                x: player.stTargetX + 1,
                y: player.stTargetY + 1,
            };

            if (!tile.layerCollidesWith(LAYERS.WALL, offPixelTarget)) {
                player.stIsMoving = true;

                // only move if target is different
                if (player.stTargetX > player.x) {
                    player.dx = player.stMoveSpeed;
                    player.playAnimation(PLAYERANIM.MOVERIGHT);
                } else if (player.stTargetX < player.x) {
                    player.dx = -1 * player.stMoveSpeed;
                    player.playAnimation(PLAYERANIM.MOVELEFT);
                } else if (player.stTargetY > player.y) {
                    player.dy = player.stMoveSpeed;
                    player.playAnimation(PLAYERANIM.MOVEDOWN);
                } else if (player.stTargetY < player.y) {
                    player.dy = -1 * player.stMoveSpeed;
                    player.playAnimation(PLAYERANIM.MOVEUP);
                }
            }
        }

        player.update();
    };

    player.playAnimation(PLAYERANIM.IDLEDOWN);
    return player;
};
