/*let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight * 2;

let scrollValue = 0;
let nightMode = false;


//    Set up the Pixi Environment

const Application = PIXI.Application
const app = new Application({
    width: WIDTH,
    height: HEIGHT,
    backgroundAlpha: 0
    
});
document.body.appendChild(app.view);
const environmentContainer = new PIXI.Container();
const spriteContainer = new PIXI.Container();

app.renderer.view.style.position = 'absolute';
app.stage.addChild(environmentContainer);

const stars = PIXI.Sprite.from("images/stars.png");
const mountains = PIXI.Sprite.from("images/mountains.png");
const trees1 = PIXI.Sprite.from("images/trees1.png");
const trees2 = PIXI.Sprite.from("images/trees2.png");

const sun = PIXI.Sprite.from("images/sun.png");

environmentContainer.addChild(stars);

environmentContainer.addChild(sun);
environmentContainer.addChild(mountains);
environmentContainer.addChild(trees1);
environmentContainer.addChild(trees2);


environmentContainer.children.forEach(element => {
    element.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    element.anchor.set(0.5);
    element.baseX = window.innerWidth / 2;
    element.baseY = window.innerHeight / 2;
});

stars.lerpAmount = 0.9;
mountains.lerpAmount = 0.85;
trees1.lerpAmount = 0.8;
trees2.lerpAmount = 1;

sun.lerpAmount = 0.2;



sun.interactive = true;
sun.cursor = 'pointer';
sun.on('pointerdown', changeColorPallete);




app.renderer.view.style.left = ((window.innerWidth - app.renderer.width) >> 1) + 'px';
    app.renderer.view.style.top = ((window.innerHeight - app.renderer.height) >> 1) + 'px';

app.ticker.add((delta) => {
    resize();
});

function resize() {
    var scale = Math.max(window.innerWidth / mountains.texture.width,
        window.innerHeight / mountains.texture.height);
    environmentContainer.children.forEach(element => {
        element.scale.x = element.scale.y = scale;
    
        adjustSpriteToCenter(element);
    });
} 

function changeColorPallete(){
    var r = document.querySelector(':root');
    if(nightMode == false){
        r.style.setProperty('--main-bg-color', '#161853');
        r.style.setProperty('--secondary-bg-color', '#292C6D');
        r.style.setProperty('--splash-color-1', '#FAEDF0');
        r.style.setProperty('--splash-color-2', '#EC255A');
        r.style.setProperty('--main-text-color', '#CCCCCC');
        r.style.setProperty('--secondary-text-color', '#AAAAAA');
        nightMode = true;
    }else{
        r.style.setProperty('--main-bg-color', '#F1DBBF');
        r.style.setProperty('--secondary-bg-color', '#B99B6B');
        r.style.setProperty('--splash-color-1', '#698269');
        r.style.setProperty('--splash-color-2', '#AA5656');
        r.style.setProperty('--main-text-color', '#000044');
        r.style.setProperty('--secondary-text-color', '#1111AA');
        nightMode = false;
    }
}

function adjustSpriteToCenter(element){
    if(element.width > window.innerWidth) {
        element.adjustmentX = (window.innerWidth - element.width) / 2;
    }else{
        element.adjustmentX = 0;
    }
    if(element.height > window.innerHeight) {
        element.adjustmentY = -(window.innerHeight - element.height) /2;
    }else{
        element.adjustmentY = 0;
    }

    element.x = element.adjustmentX + element.baseX;
    element.y = (scrollValue * element.lerpAmount) + element.adjustmentY + element.baseY;
}

window.addEventListener('scroll', function(){
    scrollValue = window.scrollY;
})

window.addEventListener('resize', resize);
*/