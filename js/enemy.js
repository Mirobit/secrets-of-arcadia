function Enemy(
  x,
  y,
  width,
  height,
  xOffset,
  yOffset,
  direction,
  avaSteps,
  stepInterval,
  avaFightSteps,
  fightStepInterval,
  maxHealth,
  strength,
  type
) {
  // Image
  this.body = new Image();
  this.body.src = "img/3/" + type + ".png";
  // Position
  // 1: right
  // 4: up
  // 7: south
  // 10: left
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.xOffset = xOffset;
  this.yOffset = yOffset;
  // this.right = this.x + this.width - this.xOffset;
  // this.left = this.x + this.xOffset;
  // this.bottom = this.y + this.height - this.yOffset;
  // this.top = this.y + this.yOffset;
  this.right = this.x + this.width;
  this.left = this.x;
  this.bottom = this.y + this.height;
  this.top = this.y;
  this.direction = direction;
  // Animation config
  this.fight = false;
  this.death = false;
  this.talking = false;

  this.avaSteps = avaSteps;
  this.stepInterval = stepInterval;
  this.step = Math.round(Math.random()) * this.stepInterval; // to have different start pic for idle animation

  this.fightStep = 0;
  this.avaFightSteps = avaFightSteps;
  this.fightStepInterval = fightStepInterval;

  this.deathStep = 1;
  this.deathInterval = 0.01;

  // character
  this.type = type;
  this.maxHealth = maxHealth;
  this.health = this.maxHealth;
  this.strength = strength;

  this.draw = function() {
    if (this.fight) {
      if (this.fightStep >= this.fightStepInterval * this.avaFightSteps) {
        this.fightStep = 0;
        this.fight = false;
        return;
      }
      if (this.direction === 10) {
        console.log("left");
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(
          this.body,
          this.width * Math.floor(this.fightStep / this.fightStepInterval),
          this.height * 1,
          this.width,
          this.height,
          -(this.x + 45),
          this.y,
          this.width,
          this.height
        );
        ctx.restore();
      } else {
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
      }

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
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "blue";
        ctx.globalAlpha = 0.2;
        ctx.fillRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
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
    this.health -= damage;
    if (this.health <= 0) {
      this.death = true;
      this.fight = false;
      console.log("Enemy received damage: " + damage + " Health: " + this.health);
      map.texts.push(new TextBar("You slayed a monster", 15));
      return true;
    }
    map.texts.push(new Text(this.x + 30, this.y, "red", "18", "-" + damage, 2));
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

  this.talkTo = function(text, duration) {
    this.talking = false;
    map.texts.push(new TextBox(this.right + 5, this.top + 5, 21, text, duration));
    map.texts.push(new TextBar("Someone is talking to you...", 4));
  };
}

function DeathKnight(x, y, direction = 8) {
  Enemy.call(this, x, y, 126, 126, 20, 15, direction, 2, 32, 5, 6, 50, 50, "deathknight");
}

function Skeleton(x, y, direction = 8) {
  Enemy.call(this, x, y, 144, 144, 20, 15, direction, 2, 32, 3, 6, 30, 30, "skeleton");
}

function SkeletonArmor(x, y, direction = 8) {
  Enemy.call(this, x, y, 144, 144, 20, 15, direction, 2, 32, 3, 6, 25, 30, "skeleton2");
}

function SkeletonBoss(x, y, direction = 8) {
  Enemy.call(this, x, y, 192, 192, 20, 15, direction, 4, 16, 6, 6, 50, 50, "boss");
}

function Ogre(x, y, direction = 8) {
  Enemy.call(this, x, y, 144, 144, 20, 15, direction, 2, 64, 3, 32, 35, 40, "ogre");
}

function Spectre(x, y, direction = 8) {
  Enemy.call(this, x, y, 102, 102, 20, 15, direction, 2, 32, 6, 6, 25, 50, "spectre");
}

function Goblin(x, y, direction = 8) {
  Enemy.call(this, x, y, 78, 78, 20, 15, direction, 2, 16, 3, 3, 25, 15, "goblin");
}

function Bat(x, y, direction = 8) {
  Enemy.call(this, x, y, 96, 108, 20, 15, direction, 5, 8, 5, 10, 50, 15, "bat");
}

function Eye(x, y, direction = 8) {
  Enemy.call(this, x, y, 120, 120, 20, 15, direction, 14, 4, 8, 6, 25, 15, "eye");
}
