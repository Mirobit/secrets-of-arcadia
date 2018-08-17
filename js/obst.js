function Obstacle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.right = this.x + this.width;
  this.left = this.x;
  this.bottom = this.y + this.height;
  this.top = this.y;

  this.draw = function() {
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
    ctx.restore();
  };
}
