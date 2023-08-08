kaboom()

scene("gameOver", () => {
    const bg = add([
        sprite('full-castle-background'),
        fixed(),
        scale(2),
        color(0, 0, 0, 0.5),
        pos(width() / 2, height() / 2),
        anchor("center"),
        layer("ui"),
    ]);

    const gameOverText = add([
        text("Game Over", {
            value: "Game Over", 
            font: "bold", 
            size: 50, 
            color: rgb(255, 255, 255),
            pos: vec2(width() / 2, height() / 2),
            anchor("center"),
        }),
    ]);
    onkeyPress("enter", () => {
        go("start");
    });
});

go("start"); // change to game scene later