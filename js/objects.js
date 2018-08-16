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
  type
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
  // Animation config
  this.avaSteps = avaSteps;
  this.stepInterval = stepInterval;
  this.step = 0; // to have different start pic for idle animation

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
  MapObject.call(this, x, y, 181, 252, 45, 45, 200, 0, 1, 0.9, "tree");
}

function Tent(x, y) {
  MapObject.call(this, x, y, 109, 147, 0, 0, 0, 100, 1, 0.9, "tent");
}

function Tent(x, y) {
  MapObject.call(this, x, y, 109, 147, 0, 0, 0, 0, 1, 0.9, "tent");
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
  MapObject.call(this, x, y, 48, 48, 0, 0, 0, 0, 2, 14, "torch");
}
