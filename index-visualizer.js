const TAU = Math.PI * 2;
const canvas = document.querySelector('.js-draw');

class Stage {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.width = width;
    this.height = height;

    this.options = {
      rotation: 10,
      backgroundColor: '#fff',
      lineColor: '#000',
    };

    this.nodes1 = [];
    this.nodes2 = [];
    this.nodes3 = [];

    this.line = { from: { x: 0, y: height * 0.5 }, to: { x: width, y: height * 0.5 } };
  }

  get rotation() {
    return this.options.rotation;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get hypo() {
    return Math.hypot(this.width, this.height);
  }

  get widthHalf() {
    return this.width * 0.5;
  }

  get heightHalf() {
    return this.height * 0.5;
  }

  get nodeParent(){
    return this.parent;
  }

  set width(w) {
    this.canvas.width = w;
  }

  set height(h) {
    this.canvas.height = h;
  }

  set nodeParent(newParent){
    this.nodeParent = newParent;
  }
  
  generate() {
    this.nodes1 = new Array(10).fill().map((_, i) => {
      return this.getNode((this.heightHalf * 0.2) + Math.random() * (this.heightHalf * .15), i);
    });

    this.nodes2 = new Array(20).fill().map((_, i) => {
      return this.getNode((this.heightHalf * 0.4) + Math.random() * (this.heightHalf * .15), i);
    });

    this.nodes3 = new Array(30).fill().map((_, i) => {
      return this.getNode((this.heightHalf * 0.6) + Math.random() * (this.heightHalf * .15), i);
    });
  }

  getNode(distance, i){
      const node = {
        distance,
        a: Math.random() * TAU,
        speed: 0.0005 + (Math.random() * 0.0008),
        heightModifier: 1 + Math.random(),
        widthModifier: 1 + (Math.random() * 0.5),
        parent: null,
        centerX: 0,
        centerY: 0,
      };
      return node;
  }

  getClosestNode(node, list){
    let closest = list[0];
    for(let i = 0; i < list.length; i++){
      if(this.getDistance(list[i], node) < this.getDistance(closest, node)){
        closest = list[i];
      }
    }
    return closest;
  }

  getDistance(node1, node2){
    return Math.sqrt(Math.pow((node2.x - node1.x), 2) + Math.pow((node2.y - node1.y), 2));
  }
  
  drawLine(from, to, color, width = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.lineWidth = width;
    this.ctx.moveTo(from.centerX, from.centerY);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawPoint(point) {
    const { from, to } = this.line;

    point.a += point.speed;
    point.x = this.width * 0.75 + (Math.cos(point.a) * point.distance);
    point.y = this.heightHalf + (Math.sin(point.a) * point.distance);

    for(let i = 0; i < this.nodes2.length; i++){
      this.nodes2[i].parent = this.getClosestNode(this.nodes2[i], this.nodes1);
    }
  
    for(let i = 0; i < this.nodes3.length; i++){
      this.nodes3[i].parent = this.getClosestNode(this.nodes3[i], this.nodes2);
    }

    const denominator = Math.hypot(to.x - from.x, to.y - from.y);
    const numerator = ((to.y - from.y) * point.x) - ((to.x - from.x) * point.y) + (to.x * from.y) - (to.y * from.x);
    const distance = numerator / denominator;

    const nodeScale = Math.abs(distance / this.heightHalf) * 40;
    const lineWidth = 0.5 + (Math.abs(distance / this.heightHalf) - 0.5);

    point.centerX = point.x + (nodeScale * point.widthModifier) / 2;
    point.centerY = point.y + (nodeScale * point.heightModifier) / 2;

    let toX = this.width * 0.75;
    let toY = this.heightHalf;
    if(point.parent != null){
      toX = point.parent.centerX;
      toY = point.parent.centerY;
    }

    this.ctx.save();
    this.ctx.globalAlpha = point.o;
    this.drawLine(point, { x: toX, y: toY }, this.options.lineColor, lineWidth);
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(point.x, point.y, nodeScale * point.widthModifier, nodeScale * point.heightModifier);
    this.ctx.rect(point.x, point.y, nodeScale * point.widthModifier, nodeScale * point.heightModifier);
    this.ctx.stroke();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(point.x, point.y, nodeScale * point.widthModifier, nodeScale * .4);
    this.ctx.closePath();
  };


  run() {
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.line.from.x = (this.width * .75) + (Math.cos(this.rotation) * this.width);
    this.line.from.y = this.heightHalf + (Math.sin(this.rotation) * this.width);
    this.line.to.x = (this.width * .75)+ (Math.cos(this.rotation + Math.PI) * this.width);
    this.line.to.y = this.heightHalf + (Math.sin(this.rotation + Math.PI) * this.width);
   
    this.nodes3.forEach((p, i) => this.drawPoint(p, i));
    this.nodes2.forEach((p, i) => this.drawPoint(p, i));
    this.nodes1.forEach((p, i) => this.drawPoint(p, i));

    this.ctx.save();
    this.ctx.translate((this.width * .75), this.heightHalf);
    this.ctx.rotate(this.rotation);
    this.ctx.globalCompositeOperation = 'difference';
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(-this.hypo / 2, 0, this.hypo, this.hypo);
    this.ctx.restore();

    requestAnimationFrame(() => this.run());
  }
}

const stage = new Stage(canvas, window.innerWidth, window.innerHeight);

stage.generate();
stage.run();

window.addEventListener('resize', () => {
  stage.width = window.innerWidth;
  stage.height = window.innerHeight;
  stage.generate();
});
