//    Set up the Pixi Environment
const Application = PIXI.Application
const app = new Application({
    backgroundAlpha: 0,
    resizeTo: window, 
    autoDensity: true, 
});
document.body.appendChild(app.view);
const spriteContainer = new PIXI.Container();
let scalefactor;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

app.renderer.view.style.position = 'absolute';
app.stage.addChild(spriteContainer);

let slimeTexture = PIXI.Texture.from("images/slime.png");
let slimeFrames = [];
let slime;

init();

app.ticker.add((delta) => {
    scalefactor = app.renderer.width / 200;
});

/*
Cuts a sprite sheet into individual frames based on arguments passed. 
Arguments: Texture for the sprite sheet, numberOfFrames for the number of evenly spaced frames, outArray for the storage position. 
Called By: (initialize)
Calls: sprite methods. 
*/
function loadSpriteSheet(texture, numberOfFrames, outArray){
    text = new PIXI.Texture(texture);
    if(text.width <= 1 || text.height <= 1) {return};
    frameWidth = text.width / numberOfFrames;
    for(i = 0; i < numberOfFrames; i++){
        rect = new PIXI.Rectangle(frameWidth * i, 0, frameWidth, text.height);
        text.frame = rect;
        outArray[i] = text;
        text = new PIXI.Texture(texture);
    }
}


function init(){
    const bufferTicker = new PIXI.Ticker
    bufferTicker.start();
    bufferTicker.add(() => {
        loadSpriteSheet(slimeTexture, 2, slimeFrames);
        if(slimeFrames.length > 0){
            postInit();
            bufferTicker.destroy();
        }
    });
}

function postInit(){
    slime = new PIXI.AnimatedSprite(slimeFrames);
    slime.play();
    slime.animationSpeed = 0.1;
    spriteContainer.addChild(slime);
    slime.anchor.set(0.5);

    app.ticker.add((delta) => {

        scalefactor = app.renderer.width / 200;
    
        slime.position.x = app.renderer.width / 2;
        slime.position.y = app.renderer.height / 2;
    
        slime.scale.x = slime.scale.y = scalefactor ;
    });
}