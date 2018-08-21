function MapObject(
  x,
  y,
  width,
  height,
  xPosOffset,
  xNegOffset,
  yPosOffset,
  yNegOffset,
  avaSteps,
  stepInterval,
  type,
  obst = true
) {
  // Image
  this.body = new Image();
  this.body.src = "img/3/" + type + ".png";
  //position
  this.x = x;
  this.y = y;
  this.xPosOffset = xPosOffset;
  this.xNegOffset = xNegOffset;
  this.yPosOffset = yPosOffset;
  this.yNegOffset = yNegOffset;
  this.width = width;
  this.height = height;
  this.right = this.x + this.width - this.xNegOffset;
  this.left = this.x + this.xPosOffset;
  this.bottom = this.y + this.height - this.yNegOffset;
  this.top = this.y + this.yPosOffset;
  this.obst = obst;
  // Animation config
  this.avaSteps = avaSteps;
  this.stepInterval = stepInterval;
  this.step = Math.round(Math.random()) * this.stepInterval; // to have different start pic for idle animation

  this.draw = function() {
    if (this.step >= this.stepInterval * this.avaSteps) {
      this.step = 0;
    }

    if (debug) {
      ctx.save();
      ctx.fillStyle = "blue";
      ctx.globalAlpha = 0.2;
      ctx.fillRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
      ctx.restore();
    }
    ctx.drawImage(
      this.body,
      this.width * Math.floor(this.step / this.stepInterval),
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.step++;
  };
}

function Fire(x, y) {
  MapObject.call(this, x, y, 48, 57, 0, 0, 25, 0, 3, 14, "fire");
}

function Tree(x, y) {
  MapObject.call(this, x, y, 181, 252, 45, 45, 200, 20, 1, 0.9, "tree");
}

function DeathTree1(x, y) {
  MapObject.call(this, x, y, 132, 198, 22, 22, 150, 0, 1, 0.9, "deathtree1");
}

function DeathTree2(x, y) {
  MapObject.call(this, x, y, 140, 211, 35, 35, 160, 0, 1, 0.9, "deathtree2");
}

function Tent(x, y) {
  MapObject.call(this, x, y, 109, 147, 0, 0, 47, 0, 1, 0.9, "tent");
}

function LavaFall(x, y) {
  MapObject.call(this, x, y, 48, 144, 0, 0, 0, 0, 4, 11, "lavafall");
}

function LavaLanding(x, y) {
  MapObject.call(this, x, y, 48, 48, 0, 0, 0, 0, 4, 11, "lavalanding");
}
function LavaBubble1(x, y) {
  MapObject.call(this, x, y, 48, 48, 0, 0, 0, 0, 6, 12, "lavabubble1");
}
function LavaBubble2(x, y) {
  MapObject.call(this, x, y, 48, 48, 0, 0, 0, 0, 4, 15, "lavabubble2");
}
function Torch(x, y) {
  MapObject.call(this, x, y, 48, 48, 0, 0, 0, 0, 2, 14, "torch", false);
}
function Flowers(x, y) {
  MapObject.call(this, x, y, 72, 48, 0, 0, 0, 0, 1, 0.9, "flower", false);
}
