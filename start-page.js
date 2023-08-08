kaboom();


scene("start", () => {
   
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
});


go("start");

