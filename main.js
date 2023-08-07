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

loadSprite("idle-sprite", "Assets/Mage/mage.png")
// loadSprite("eat-sprite", "Assets/Mage/mage idle.png", {
//     sliceX: 14, sliceY: 1,
//     anims: {"eat-anim": {from: 0, to: 13, loop:true}}
// });
loadSprite("run-sprite", "Assets/Mage/mage walk.png",{
    sliceX: 6, sliceY: 1,
    anims: {"run-anim": {from: 0, to: 5, loop:true}}
})
loadSprite("jump-sprite", "Assets/Mage/mage jump.png",{
    sliceX: 4, sliceY: 1,
    anims: {"jump-anim": {from: 0, to: 3, loop:true}}
})
loadSprite("fall-sprite", "Assets/Mage/mage fall.png",{
    sliceX: 2, sliceY: 1,
    anims: {"fall-anim": {from: 0, to: 0, loop:false}}
})
loadSprite("liz-idle-sprite", "Assets/Enemys/lizard Idle.png", {
    sliceX: 3, sliceY: 1,
    anims : {"liz-idle-anim": {from: 0, to: 2, loop:true}}
})
loadSprite("liz-walk-sprite", "Assets/Enemys/lizard Idle.png", {
    sliceX: 4, sliceY: 1,
    anims : {"liz-walk-anim": {from: 0, to: 3, loop:true}}
})
loadSprite("liz-death-sprite", "Assets/Enemys/lizard Idle.png", {
    sliceX: 4, sliceY: 1,
    anims : {"liz-death-anim": {from: 0, to: 3, loop:false}}
})


setGravity(1000)

const player = add([
    sprite("idle-sprite"),
    scale(1),
    // area({shape: new Rect(vec2(0),54,32), offset: vec2(0,74)}),
    // anchor("topleft"),
    // body(),
    area({shape: new Rect(vec2(0),64,32), offset: vec2(0,28)}),
    body(),
    anchor("center"),
    pos(200, 500),
    {
        speed: 300,
        previousHeight: null,
        heightDelta: 0,
        direction: "right"
    }
])

function spawnBullet(player) {
    const bulletDirection = player.direction === "right" ?  0: 180
    const bulletPosition = vec2(player.pos.x, player.pos.y + 12); // Set bullet position based on player's position
    console.log("this shoulf")
    add([
        rect(20, 12),
        area(),
        pos(bulletPosition),
        anchor("center"),
        color(127, 127, 255),
        outline(4),
        move(bulletDirection, BULLET_SPEED), // Set bullet's movement direction
        offscreen({ destroy: true }),
        "bullet",
    ]);
}



// player.play("eat-anim");

onKeyDown("right", () => {
    if(player.curAnim() !== 'run-anim' && player.isGrounded()){
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }
    if (player.direction !== 'right') player.direction = "right"

    player.move(player.speed, 0)
})

onKeyRelease('right', () => {
    player.use(sprite('idle-sprite'))
    // player.play('idle-anim')
})

onKeyDown("left", () => {
    if(player.curAnim() !== 'run-anim' && player.isGrounded()){
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }
    if (player.direction !== 'left') player.direction = "left"

    player.move(-player.speed, 0)
})

onKeyRelease('left', () => {
    player.use(sprite('idle-sprite'))
    // player.play('idle-anim')
})

onKeyPress('up', () => {
    if(player.isGrounded()){
        player.jump()
    }
})
onKeyPress("space", () => {
    spawnBullet(player)
    console.log("shoulda shot")
})

camScale(1)
class Lizard {
    static all =[]
    constructor(x,y){
        Lizard.all.push(add([
            sprite("liz-idle-sprite"),
            scale(1),
            area({shape: new Rect(vec2(0),64,32), offset: vec2(0,0)}),
            body(),
            anchor("center"),
            pos(x,y),
            health(1),
            {
                speed: 100,
                direction: "left"
            },
            "enemy"
        ]))
    }
}
let liz1 = new Lizard(300, 500)

// Dynamic Update, collisions logic
onUpdate(() => {
    if (player.previousHeight){
        player.heightDelta = player.previousHeight - player.pos.y
    }

    player.previousHeight = player.pos.y

    const cameraLeftBound = 550
    const cameraRightBound = 3000
    const cameraVerticalOffset = player.pos.y - 100

    if(cameraLeftBound > player.pos.x){
        camPos(cameraLeftBound, cameraVerticalOffset)
    }else if (cameraRightBound > player){
        camPos(cameraRightBound, cameraVerticalOffset)
    }else {
        camPos(player.pos.x, cameraVerticalOffset)
    }
    if(player.curAnim() !== 'run-anim' && player.isGrounded()){
        player.use(sprite('idle-sprite'))
    }

    if(player.curAnim() !== "jump-anim" && !player.isGrounded() && player.heightDelta > 0){
        player.use(sprite('jump-sprite'))
        player.play('jump-anim')
    }
    if(player.curAnim() !== "fall-anim" && !player.isGrounded() && player.heightDelta < 0){
        player.use(sprite('fall-sprite'))
        player.play('fall-anim')
    }

    if(player.direction === "left"){
        player.flipX = true
    } else {
        player.flipX = false
    }
})

onCollide("bullet", "enemy", (b, e) => {
    destroy(b)
    e.hurt(1)
})
on("death", "enemy", (e) => {
    destroy(e)
    shake(2)
    addKaboom(e.pos)
})