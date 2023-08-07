console.log("Apple")
kaboom({
    // width: 1900,
    // height: 900
})
const BULLET_SPEED = 400

loadSprite("full-castle-background", "Assets/Background.png")


add([
    sprite('full-castle-background'),
    fixed(),
    scale(2)
])
// cropped castle tileset Image.jpg
loadSpriteAtlas("tileset.jpg", {
    // 'solid-top-left': {x: 0, y: 0, width: 64, height: 64},
    // 'solid-top-right': {x: 170 - 64, y: 0, width: 64, height: 64},
    'solid-top': {x: 66, y: 0, width: 64, height: 64},
    'deep-block': {x:66, y: 66, width: 64, height: 64},
})

const map = addLevel([
    '       3                       ',
    '       3                       ',
    '       3                       ',
    '       3                       ',
    '       3                       ',
    '                              ',
    '                              ',
    '       3                       ',
    '       3                       ',
    '       3                       ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '33333333333333333333    33333333333  33333333 33 33 33  ',
    '222222222                     ',
    '222222222                     '
], {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
        2: () => [sprite("deep-block"), area(), body({isStatic: true})],
        3: () => [sprite("solid-top"), area(), body({isStatic: true})],
    }

})