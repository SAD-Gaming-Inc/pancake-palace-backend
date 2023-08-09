

kaboom({
    // width: 1900,
    // height: 900
})


const BULLET_SPEED = 400
const FALL_DEATH = 1800

loadSprite("full-castle-background", "Assets/Background.png")
loadSprite("pancake-level-background", "Assets/pancake level background.png")



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

const Levels =  [ [
    '                                                                                          ',
    '                                                                                          ',
    '                                                                                          ',
    '                                                                                          ',
    '                                                   3                                      ',
    '                                                    3                                     ',
    '                                                     3                                    ',
    '                                                      3                                   ',
    '                                                       3      S             L             ',
    '                                                           3                3             ',
    '                                     M                    3                32             ',
    '                                                         3   3            322             ',
    '                                                        3                3222             ',
    '        L     L      L                                         3     A  32222            ',
    '3333333333333333333333333333  33   333    3333     3333          333333322222  3333       ',
    '222222222                                         M                                       ',
    '222222222                                                                                 '
  ],

[
    '                              ',
    '                             ',
    '                              ',
    '                            ',
    '                             ',
    '                              ',
    '                              ',
    '       0                      ',
    '       0                      ',
    '       0                      ',
    '                              ',
    '                              ',
    '       0                       ',
    '       0                       ',
    '0000000000000000000000000000000  ',
    '000000                   ',
    '222222222                     '
], 
]



const levelconfig = {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
        0: () => [rect(64,64), opacity(0), area(), body({isStatic: true})],
        2: () => [sprite("deep-block"), area(), body({isStatic: true})],
        3: () => [sprite("solid-top"), area(), body({isStatic: true})],
    }

}
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
loadSprite("hurt-sprite", "Assets/Mage/mage hurt.png",{
    sliceX: 4, sliceY: 1,
    anims: {"hurt-anim": {from: 0, to: 3, loop:false,}}
})
loadSprite("liz-idle-sprite", "Assets/Enemys/lizard Idle.png", {
    sliceX: 3, sliceY: 1,
    anims : {"liz-idle-anim": {from: 0, to: 2, loop:true}}
})
loadSprite("liz-walk-sprite", "Assets/Enemys/lizard walk.png", {
    sliceX: 4, sliceY: 1,
    anims : {"liz-walk-anim": {from: 0, to: 3, loop:true}}
})
loadSprite("liz-death-sprite", "Assets/Enemys/lizard death.png", {
    sliceX: 4, sliceY: 1,
    anims : {"liz-death-anim": {from: 0, to: 3, loop:false}}
})
loadSprite("skull-idle-sprite", "Assets/Enemys/skull idle.png", {
    sliceX: 4, sliceY: 1,
    anims : {"skull-idle-anim": {from: 0, to: 3, loop:true}}
})
loadSprite("skull-attack-sprite", "Assets/Enemys/skull attack.png", {
    sliceX: 3, sliceY: 1,
    anims : {"skull-idle-anim": {from: 0, to: 2, loop:true}}
})
loadSprite("skull-death", "Assets/Enemys/skull death.png", {
    sliceX: 5, sliceY: 1,
    anims : {"skull-death-anim": {from: 0, to: 4, loop:false}}
})
loadSprite("mos-flight-sprite", "Assets/Enemys/mos flight.png", {
    sliceX: 3, sliceY: 1,
    anims : {"mos-flight-anim": {from: 0, to: 2, loop:true}}
})
loadSprite("mos-death-sprite", "Assets/Enemys/mos death.png", {
    sliceX: 4, sliceY: 1,
    anims : {"mos-death-anim": {from: 0, to: 3, loop:true}}
})
loadSprite("axe-trap", "Assets/Enemys/Axe_Trap.png")
loadSprite("pancake", 'Assets/Enemys/pancake.png')
function loadLevel(levelId) {
    go("game", { levelId });
}


scene("start", () => {
    loadFont()
    const bgColor = color(122, 48, 108); 

    add([
        rect(width(), height()), 
        bgColor,
        pos(width() / 2, height() / 2),
        anchor("center"),
    ]);

    const startGame = add([
        text("Press Enter to Continue", {
          transform: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
            scale: wave(1, 1.2, time() * 3 + idx),
            angle: wave(-24, 9, time() * 3 + idx),
          }),
        }),
        pos(width() / 2, height() / 1.5),
        scale(0.75, 0.75),
        anchor("center"),
        area(),
      ]);
    
    const titleText = add([
        text("Pancake Palace", {
          transform: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
            scale: wave(1, 1.2, time() * 3 + idx),
            angle: wave(-24, 9, time() * 3 + idx),
          }),
        }),
        pos(width()/2,startGame.pos.y/2),
        scale(1.5),
        anchor("center"),
        area(),
      ])
    onKeyPress("enter", () => {
        go("controls");   
      });
});

scene("controls", () => {
    let tutorialBg= add([
      sprite('full-castle-background'),
      fixed(),
      scale(2)
    ])
    const spacebar = add([
        text("Press Spacebar shoot",{
          transform: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(0, wave(-1, 1, time() * 4 + idx * 0.2)),
            scale: wave(1, 1.1, time() * 3 + idx),
            angle: wave(-8, 9, time() * 3 + idx),
          }),
        }),
        pos(width() / 2, height() / 2.4),
        scale(0.75, 0.75),
        anchor("center"),
        area(),
      ]);
      const arrowKeys = add([
        text("Press Left and Right arrow keys to walk",{
          transform: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(0, wave(-1, 1, time() * 4 + idx * 0.2)),
            scale: wave(1, 1.1, time() * 3 + idx),
            angle: wave(-8, 9, time() * 3 + idx),
          }),
        }),
        pos(width() / 2, height() / 2),
        scale(0.75, 0.75),
        anchor("center"),
        area(),
      ]);
    
      const upArrowKey = add([
        text("Press Up arrow to jump",{
          transform: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
            scale: wave(1, 1.2, time() * 3 + idx),
            angle: wave(-24, 9, time() * 3 + idx),
          }),
        }),
        pos(width() / 2, height() / 1.5),
        scale(0.75, 0.75),
        anchor("center"),
        area(),
      ]);
    
      const begin = add([
        text("Press Enter to Play!",{
          transform: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
            scale: wave(1, 1.2, time() * 3 + idx),
            angle: wave(-24, 9, time() * 3 + idx),
          }),
        }),
        pos(width() / 2, height() / 1.2),
        scale(0.75, 0.75),
        anchor("center"),
        area(),
      ]);
    onKeyPress("enter", () => {
      go("game")
    })
  })

scene("lose", () => {
    let loser = add([
      sprite('full-castle-background'),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(3),
      fixed()
    ]);
    
    const gameOverText = add([
      text(`You Lose! Press 'Space' to Retry`),
      color(255, 255, 255),
      anchor("center"),
      pos(width() / 2, height() / 2),
    ]);
    
    onKeyPress("space", () => {
        go("game")
    });
});

scene("win", () => {
    let winner = add([
      sprite('pancake-level-background'),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(3),
      fixed()
    ]);
    
    const winText = add([
      text(`You Won! Press 'Space' to Play Again`, {
          transform: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
            scale: wave(1, 1.2, time() * 3 + idx),
            angle: wave(-24, 9, time() * 3 + idx),
          }),
      }),
    //   color(255, 255, 255),
      anchor("center"),
      scale(1.5),
      pos(width() / 2, height() / 2),
      area(),
    ]);
    
    onKeyPress("space", () => {
        go("game")
    });
});


scene("game", ({ levelId } = { levelId: 0}) => {
    const backgroundSprite = levelId === 1 ? "pancake-level-background" : "full-castle-background"
    const backgroundScale =  levelId === 1 ? 1: 2
    add([
        sprite(backgroundSprite),
        fixed(),
        scale(backgroundScale),
    ]);
    const level = addLevel(Levels[levelId ?? 0], levelconfig)
    const tileSize = levelconfig.tileWidth;
  


setGravity(1000)
// add([
//     sprite('full-castle-background'),
//     fixed(),
//     scale(2)
// ])

const player = add([
    sprite("idle-sprite"),
    scale(1),
    area({shape: new Rect(vec2(0),32,32), offset: vec2(-20,28)}),
    body(),
    anchor("center"),
    pos(200, 500),
    health(3),
    {
        speed: 300,
        previousHeight: null,
        heightDelta: 0,
        direction: "right",
        canBeHurt: true,
        health: 3,
        hurtCooldownDuration: 2, // Cooldown duration in seconds
    },
    "player"
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
function spawnEnemyBullet(enemy) {
    const bulletDirection = enemy.direction === "right" ?  0: 180
    const bulletPosition = vec2(enemy.pos.x, enemy.pos.y + 12); // Set bullet position based on enemy's position
    add([
        rect(30, 20),
        area(),
        pos(bulletPosition),
        anchor("center"),
        color(139, 0, 0),
        outline(4),
        move(bulletDirection, BULLET_SPEED), // Set bullet's movement direction
        offscreen({ destroy: true }),
        "enemy bullet",
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
    static all =[];
    constructor(x, y){
        Lizard.all.push(add([
            sprite("liz-walk-sprite"), // Use the walk sprite initially
            scale(1),
            area({shape: new Rect(vec2(0), 64, 32), offset: vec2(0, 0)}),
            body(),
            anchor("center"),
            pos(x, y),
            health(1),
            offscreen(),
            {
                speed: 100,
                direction: "right", // Start by facing right
                markedForDeletion: false
            },
            "enemy"
        ]));

        this.walk();
    }

    walk() {
        // Change the lizard's animation to walk-anim
        Lizard.all[Lizard.all.length - 1].use(sprite("liz-walk-sprite"));
        Lizard.all[Lizard.all.length - 1].play("liz-walk-anim");
    }
}
// let liz1 = new Lizard(300, 880)
// let liz3 = new Lizard(800, 500)

class Mos {
    static all =[];
    constructor(x, y){
        Mos.all.push(add([
            sprite("mos-flight-sprite"), 
            scale(1),
            area({shape: new Rect(vec2(0), 64, 32), offset: vec2(0, 0)}),
            // body(),
            anchor("center"),
            pos(x, y),
            health(1),
            offscreen(),
            {
                speed: 140,
                direction: "right", 
                markedForDeletion: false,
            },
            "enemy"
        ]));

        this.flight();
    }

    flight() {
        // Change the lizard's animation to walk-anim
        Mos.all[Mos.all.length - 1].use(sprite("mos-flight-sprite"));
        Mos.all[Mos.all.length - 1].play("mos-flight-anim");
    }
}

function onMosUpdate(mos){
    const playerPosition = player.pos;
    const mosPosition = mos.pos;

    const directionToPlayer = playerPosition.sub(mosPosition).unit();
    const movementVector = directionToPlayer.scale(mos.speed);

    mos.move(movementVector.x, movementVector.y); // arctan2 angle formula, don't look into if unless u know trig, just know it works

    // Update the direction based on the player's position
    if (movementVector.x > 0) {
        mos.direction = "right";
        mos.flipX = false;
    } else {
        mos.direction = "left";
        mos.flipX = true;
    }
}

// let mos1 = new Mos(600,600)

class Skull {
    static all =[];
    constructor(x, y){
        Skull.all.push(add([
            sprite("skull-idle-sprite"), 
            scale(1),
            area({shape: new Rect(vec2(0), 64, 64), offset: vec2(0, 0)}),
            // body(),
            anchor("center"),
            pos(x, y),
            health(1),
            offscreen(),
            {
                speed: 100,
                direction: "left", // Start by facing left
                shootInterval: 2,
                shootTimer: 0,
                markedForDeletion: false
            },
            "enemy",
            "skull",
        ]));

        this.idle();
    }

    idle() {
        // Change the lizard's animation to walk-anim
        Skull.all[Skull.all.length - 1].use(sprite("skull-idle-sprite"));
        Skull.all[Skull.all.length - 1].play("skull-idle-anim");
        Skull.all[Skull.all.length - 1].flipX = true
    }
}
function onUpdateSkull(skull){
        // Update the shoot timer for the Skull
        skull.shootTimer += dt();

        // Check if the Skull can shoot based on the shoot interval
        if (skull.shootTimer >= skull.shootInterval) {
            skull.shootTimer = 0; // Reset the timer
            spawnEnemyBullet(skull); // Call the bullet spawning function
        }
}

// let skull1 = new Skull(600,800)

// class Axe {
//     static all =[];
//     constructor(x, y){
//         Axe.all.push(add([
//             sprite("axe-trap"), 
//             scale(3),
//             area({shape: new Rect(vec2(0), 64, 32), offset: vec2(0, 0)}),
//             // body(),
//             anchor("center"),
//             pos(x, y),
//             health(1),
//             {
//                 speed: 100,
//                 markedForDeletion: false,
//                 angle: 0
//             },
//             "obstacle",
//         ]));

//     }

// }

// function onAxeUpdate(axe){
//     //code
// }
class Axe {
    static all = [];
    constructor(x, y) {
        Axe.all.push(add([
            sprite("axe-trap"),
            scale(3),
            area({shape: new Rect(vec2(0), 32, 16), offset: vec2(0, 40)}),
            anchor(vec2(0, -0.75)),
            center({ origin: "top", x: 70 }),
            pos(x, y),
            health(1),
            {
                angle: 0,
                speed: 100,
                markedForDeletion: false,
            },
            "obstacle",

        ]));
    }
}


function onAxeUpdate(axe) {
    // Update the axe's angle
    axe.angle += dt() * 50; // You can adjust the rotation speed as needed
    axe.use(sprite("axe-trap"), {
        rotation: axe.angle,
    })
}

if (levelId === 1){
    function spawnPancake(){
      add([
            sprite('pancake'),
            area(),
            pos(400, 0),
            // anchor("center"),
            move(DOWN, BULLET_SPEED),
            "obstacle"
        ]);

        // wait a random amount of time to spawn next tree
        wait(rand(0.5, 1.5), spawnPancake); 
        console.log('should be pancake')
    }

    function timedPancakeLevel(){
        wait(30, () => {
            go("win")
        })
    }
    spawnPancake();
    timedPancakeLevel();
}

sevel = Levels[levelId]
console.log(sevel)

for (let y = 0; y < sevel.length; y++) {
    for (let x = 0; x < sevel[y].length; x++) {
     if (sevel[y][x] === 'L') {
        new Lizard(x * tileSize, y * tileSize);
        console.log("Found an L at" + x)
      }else if (sevel[y][x] === 'M') {
        new Mos(x * tileSize, y * tileSize);
        console.log("Found an M at" + x)
      }
      if (sevel[y][x] === 'S') {
        new Skull(x * tileSize, y * tileSize);
        console.log("Found an L at" + x)
      }
      if (sevel[y][x] === 'A') {
        new Axe(x * tileSize, y * tileSize + 96);
        console.log("Found an A at" + x)
      }
    }
  }


// Dynamic Update, collisions logic
onUpdate(() => {
    if (player.previousHeight){
        player.heightDelta = player.previousHeight - player.pos.y
    }

    player.previousHeight = player.pos.y
    player.area.offset = vec2(player.direction === "right" ? -20 : 20, 28);

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
    if(player.curAnim() !== 'run-anim' && player.curAnim() !== 'hurt-anim' && player.isGrounded()){
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
    if (player.pos.y >= FALL_DEATH) {
        go("lose")
    }
    
    Lizard.all.forEach(lizard => {
        if (lizard.isOffScreen()) {
            return; // Skip updating offscreen lizard
        }
        if (lizard.direction === "right") {
            lizard.move(lizard.speed, 0);
            lizard.flipX = false;
        } else {
            lizard.move(-lizard.speed, 0);
            lizard.flipX = true;
        }
    });

    Mos.all.forEach(mos => {
        if (mos.isOffScreen()) {
            return; 
        }
        onMosUpdate(mos)
    });
    Skull.all.forEach(skull => {
        if (skull.isOffScreen()) {
            return; 
        }
        onUpdateSkull(skull)
    })
    Axe.all.forEach(axe => {
        onAxeUpdate(axe);
    });

    //filter Dead Enemies
    Lizard.all = Lizard.all.filter((liz) => !liz.markedForDeletion)
    Mos.all = Mos.all.filter((mos) => !mos.markedForDeletion)
    Skull.all = Skull.all.filter((skull) => !skull.markedForDeletion)


  
 

})


onCollide("bullet", "enemy", (bullet, enemy) => {
    destroy(bullet)
    enemy.hurt(1)
})
// onCollide("enemy bullet", "player", (bullet, player) => {
//     destroy(bullet)
//     addKaboom(player.pos)
// })
on("death", "enemy", (enemy) => {
    destroy(enemy)
    enemy.markedForDeletion = true
    shake(2)
    addKaboom(enemy.pos)
})
onKeyPress("n", () => {
    const nextLevelId = 1; // Assuming level 1 is the second level
    loadLevel(nextLevelId);
    levelId = 1
});

player.on("death", () => {

    player.health = 3;
    go("lose");
});
onCollide("enemy bullet", "player", (bullet, player) => {
    destroy(bullet);
    player.trigger("hurt"); // Trigger player hurt event
});
onCollide("enemy", "player", (enemy, player) => {
    if (player.canBeHurt) {
        player.canBeHurt = false;
        player.use(sprite("hurt-sprite"));
        player.play("hurt-anim", {
            loop: false,
            onComplete: () => {
                player.isHurt = false; // Reset the hurt animation flag
                player.use(sprite("idle-sprite")); // Return to idle animation after hurt
            },
        });
        wait(player.hurtCooldownDuration, () => {
            player.canBeHurt = true; // Reset the canBeHurt property after cooldown
        });
        player.health--; // Deduct health when hurt
        console.log(player.health)
        if(player.health <= 0){
            player.trigger("death")
        }
    }
});
onCollide("obstacle", "player", (obstacle, player) => {
    if (player.canBeHurt) {
        player.canBeHurt = false;
        player.use(sprite("hurt-sprite"));
        player.play("hurt-anim", {
            loop: false,
            onComplete: () => {
                player.isHurt = false; // Reset the hurt animation flag
                player.use(sprite("idle-sprite")); // Return to idle animation after hurt
            },
        });
        wait(player.hurtCooldownDuration, () => {
            player.canBeHurt = true; // Reset the canBeHurt property after cooldown
        });
        player.health--; // Deduct health when hurt
        console.log(player.health)
        if(player.health <= 0){
            player.trigger("death")
        }
    }
});
  
})

go("start");