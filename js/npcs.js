function NPC(x, y, type, text) {
  // Position
  // 1: right
  // 4: up
  // 7: south
  // 10: left
  // Image
  this.body = new Image();
  this.body.src = "img/3/" + type + ".png";
  //position
  this.width = 72;
  this.height = 72;
  this.xOffset = 15;
  this.yOffset = 6;
  this.x = x;
  this.y = y;
  this.right = this.x + this.width - this.xOffset;
  this.left = this.x + this.xOffset;
  this.bottom = this.y + this.height - this.yOffset;
  this.top = this.y + this.yOffset;
  // Animation config
  this.talking = false;
  this.talkCounter = 0;

  this.avaSteps = 2;
  this.stepInterval = 64;
  this.step = Math.round(Math.random()) * this.stepInterval; // to have different start pic for idle animation

  // Text
  this.text = text;

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
    //console.log(this.body);
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

  this.talkTo = function(text = this.text) {
    this.talking = false;
    map.texts.push(new TextBox(this.right + 5, this.top + 5, 17, text, 3));
    map.texts.push(new TextBar("Someone is talking to you...", 4));
  };
}
