function Enemy(x, y, type, ctx) {
  // Image
  this.body = new Image();
  this.body.src = "img/3/" + type + ".png";
  // Position
  // 1: right
  // 4: up
  // 7: south
  // 10: left
  this.width = 126;
  this.height = 126;
  this.x = x;
  this.y = y;
  this.right = this.x + this.width;
  this.left = this.x;
  this.bottom = this.y + this.height;
  this.top = this.y;
  this.direction = 8;
  // Animation config
  this.fight = false;
  this.death = false;

  this.step = Math.round(Math.random()) * 4; // to have different start pic for idle animation
  this.avaSteps = 2;
  this.stepInterval = 32;

  this.fightStep = 0;
  this.avaFightSteps = 5;
  this.fightStepInterval = 5;

  this.deathStep = 1;
  this.deathInterval = 0.01;

  // character
  this.maxHealth = 30;
  this.health = this.maxHealth;
  this.strength = 40;
  this.armor = 10;

  this.draw = function() {
    if (this.fight) {
      if (this.fightStep >= this.fightStepInterval * this.avaFightSteps) {
        this.fightStep = 0;
        this.fight = false;
        return;
      }
      ctx.drawImage(
        this.body,
        this.width * Math.floor(this.fightStep / this.fightStepInterval),
        this.height * this.direction,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.fightStep++;
    } else if (this.death) {
      if (this.deathStep <= 0) {
        console.log("DEAHT!!!!!!!!!!!!!!!!!!!!!!!");
        return;
      }
      ctx.save();
      ctx.globalAlpha = this.deathStep;
      ctx.drawImage(
        this.body,
        this.width * Math.floor(this.fightStep / this.fightStepInterval),
        this.height * this.direction,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      ctx.restore();
      this.deathStep -= this.deathInterval;
    } else {
      if (debug) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.2;
        ctx.fillRect(this.x, this.y, this.width, this.width);
        ctx.restore();
      }
      if (this.step >= this.stepInterval * this.avaSteps) {
        this.step = 0;
      }
      ctx.drawImage(
        this.body,
        this.width * Math.floor(this.step / this.stepInterval),
        this.height * this.direction,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.step++;
    }
  };
  this.attack = function() {
    if (!this.checkRange()) {
      return;
    }
    this.fight = true;
    console.log("enemy fight:" + player.direction);
    switch (player.direction) {
      case 1:
        this.direction = 10;
        break;
      case 10:
        this.direction = 0;
        break;
      case 4:
        this.direction = 6;
        break;
      case 7:
        this.direction = 3;
        break;
    }
    if (this.fightStep > 0) {
      this.fightStep = 0;
    }
    player.receiveDamage(this.strength);
  };

  this.receiveDamage = function(damage) {
    damage = damage - this.armor;
    this.health -= damage;
    if (this.health <= 0) {
      this.death = true;
      this.fight = false;
      console.log(
        "Enemy received damage: " + damage + " Health: " + this.health
      );
      map.texts.push(new Text(this.x + 30, this.y, "red", "20", "Death!", 4));
      return true;
    }
    map.texts.push(new Text(this.x + 30, this.y, "red", "17", "-" + damage, 2));
    return false;
  };

  this.checkRange = function() {
    if (
      this.right >= player.left &&
      this.left < player.right &&
      this.bottom >= player.top &&
      this.top <= player.bottom
    ) {
      console.log("player in attack area");
      return true;
    } else {
      return false;
    }
  };
}
