function MapObject(
  x,
  y,
  width,
  height,
  xOffset,
  yOffset,
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
  this.xOffset = xOffset;
  this.yOffset = yOffset;
  this.width = width;
  this.height = height;
  this.right = this.x + this.width - this.xOffset;
  this.left = this.x + this.xOffset;
  this.bottom = this.y + this.height - this.yOffset;
  this.top = this.y + this.yOffset;
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
      ctx.fillRect(
        this.left,
        this.top,
        this.right - this.left,
        this.bottom - this.top
      );
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
  MapObject.call(this, x, y, 48, 57, 0, 0, 3, 14, "fire");
}

function Tree(x, y) {
  MapObject.call(this, x, y, 48, 57, 0, 0, 1, 0.9, "tree");
}

function Tent(x, y) {
  MapObject.call(this, x, y, 109, 147, 0, 0, 1, 0.9, "tent");
}
