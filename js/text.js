function Text(x, y, color, size, text, duration, background) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
  this.text = text;
  this.step = duration;
  this.fading = 0.1;
  this.avaSteps = 1;
  this.stepInterval = 8;

  this.draw = function() {
    if (this.step <= 0) {
      map.texts.splice(map.texts.indexOf(this), 1);
      return;
    }

    ctx.save();
    ctx.globalAlpha = this.step;
    ctx.fillStyle = color;
    ctx.font = size + "px Arial";
    ctx.fillText(text, this.x, this.y);
    ctx.restore();

    this.step -= this.fading;
  };
}

function TextBox(x, y, size, text, duration) {
  this.x = x;
  this.y = y;
  //this.color = color;
  this.size = size;
  this.text = text;
  this.step = duration;
  this.width = (size * text.length) / 1.6 + 20;
  this.height = size + 20;
  this.fading = 0.1;
  this.avaSteps = 1;
  this.stepInterval = 8;
  console.log("height ", this.height);
  // Image
  // this.body = new Image();
  // this.body.src = "img/3/" + type + ".png";

  this.draw = function() {
    if (this.step <= 0) {
      map.texts.splice(map.texts.indexOf(this), 1);
      return;
    }
    console.log(this.text);
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.7;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.font = size + "px monospace";
    ctx.fillText(text, this.x + 10, this.y + 25);
    ctx.restore();

    this.step -= 0.01;
  };
}
