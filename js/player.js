function Player(x, y, ctx) {
  // Position => 1: right / 4: up / 7: south / 10: left
  this.width = 96;
  this.height = 96;
  this.x = x;
  this.y = y;
  this.xOffset = 25;
  this.yOffset = 15;
  this.right = this.x + this.width - this.xOffset;
  this.left = this.x + this.xOffset;
  this.bottom = this.y + this.height - this.yOffset;
  this.top = this.y + this.yOffset;
  this.direction = 7;
  // Animation config
  this.speed = 5;
  this.step = -1;
  this.fightStep = 0;
  this.maxFightStep = 16;
  this.fight = false;
  // character
  this.armorItem = new Cloth(0, 0, true);
  this.weaponItem = new Axe(0, 0, true);
  this.maxHealth = 259;
  this.health = this.maxHealth;
  this.basicStrength = 10;
  this.strength = this.weaponItem.strength + this.basicStrength;
  this.inventar = [];

  // Image
  this.body = new Image();
  this.body.src = "img/3/" + this.armorItem.type + ".png";
  this.weapon = new Image();
  this.weapon.src = "img/3/" + this.weaponItem.type + ".png";

  this.draw = function() {
    if (this.fight) {
      if (this.fightStep > this.maxFightStep) {
        this.fightStep = 0;
        this.fight = false;
        return;
      }
      ctx.drawImage(
        this.body,
        96 * Math.floor(this.fightStep / (this.maxFightStep / 4)),
        96 * (this.direction - 1),
        96,
        96,
        this.x,
        this.y,
        96,
        96
      );
      ctx.drawImage(
        this.weapon,
        144 * Math.floor(this.fightStep / (this.maxFightStep / 4)),
        144 * (this.direction - 1),
        144,
        144,
        this.x - 25,
        this.y - 20,
        144,
        144
      );
      this.fightStep++;
    } else {
      console.log;
      if (debug) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.2;
        ctx.fillRect(this.x, this.y, 96, 96);
        ctx.restore();
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
        96 * Math.floor(this.step / 8),
        96 * this.direction,
        96,
        96,
        this.x,
        this.y,
        96,
        96
      );
      ctx.drawImage(
        this.weapon,
        144 * Math.floor(this.step / 8),
        144 * this.direction,
        144,
        144,
        this.x - 27,
        this.y - 20,
        144,
        144
      );
    }
  };
  this.move = function(direction) {
    this.fight = false;
    this.fightStep = -1;
    this.direction = direction;
    if (this.borderCheck()) {
      return false;
    }
    if (this.crashWith()) {
      return;
    }
    if (this.step >= 31) {
      this.step = -1;
    }
    switch (direction) {
      case 1:
        this.x += this.speed;
        break;
      case 10:
        this.x -= this.speed;
        break;
      case 4:
        this.y -= this.speed;
        break;
      case 7:
        this.y += this.speed;
        break;
    }
    this.right = this.x + this.width - this.xOffset;
    this.left = this.x + this.xOffset;
    this.bottom = this.y + this.height - this.yOffset;
    this.top = this.y + this.yOffset;
    this.step++;
    this.checkItem();
    this.checkItem;
  };
  this.attack = function(enemies) {
    var target = this.checkRange(enemies);
    if (target != false) {
      console.log("player found enemy to attack");
      target.receiveDamage(this.strength);
    }
    this.fight = true;
    if (this.fightStep > 0) {
      this.fightStep = 0;
    }
  };

  this.receiveDamage = function(damage) {
    damage = damage - this.armorItem.defense;
    this.health -= damage;
    if (this.health <= 0) {
      this.death = true;
      this.fight = false;
      console.log(
        "Player received damage: " + damage + " Health: " + this.health
      );
      map.texts.push(
        new Text(this.x + 25, this.y, "white", "bold 17", "Death!", 4)
      );
      return;
    }
    map.texts.push(
      new Text(this.x + 25, this.y, "white", "17", "-" + damage, 2)
    );
  };

  this.crashWith = function() {
    var obstacles = map.obstacles.concat(map.npcs);
    for (var obst of obstacles) {
      switch (this.direction) {
        case 1:
          if (
            this.right + this.speed >= obst.left &&
            this.left < obst.right &&
            this.bottom >= obst.top &&
            this.top <= obst.bottom
          ) {
            console.log("obstacle hit from left");
            return true;
          }
          break;
        case 4:
          if (
            this.right >= obst.left &&
            this.left < obst.right &&
            this.bottom >= obst.top &&
            this.top - this.speed <= obst.bottom
          ) {
            console.log("obstacle hit from bottom");
            return true;
          }
          break;
        case 7:
          if (
            this.right >= obst.left &&
            this.left < obst.right &&
            this.bottom + this.speed >= obst.top &&
            this.top <= obst.bottom
          ) {
            console.log("obstacle hit from top");
            return true;
          }
          break;
        case 10:
          if (
            this.right >= obst.left &&
            this.left - this.speed < obst.right &&
            this.bottom >= obst.top &&
            this.top <= obst.bottom
          ) {
            console.log("obstacle hit from right");
            return true;
          }
          break;
      }
    }
    return false;
  };

  this.borderCheck = function() {
    switch (this.direction) {
      case 1:
        if (this.right >= ctx.canvas.width) {
          console.log("right border");
          return true;
        }
        break;
      case 4:
        if (this.top <= 0) {
          console.log("up border");
          return true;
        }
        break;
      case 7:
        if (this.bottom >= ctx.canvas.height) {
          console.log("down border");
          return true;
        }
        break;
      case 10:
        if (this.left <= 0) {
          console.log("left border");
          return true;
        }
        break;
    }
    return false;
  };
  // check if enemy in range to attack
  this.checkRange = function(enemies) {
    for (var enemy of enemies) {
      if (
        this.right >= enemy.left &&
        this.left < enemy.right &&
        this.bottom >= enemy.top &&
        this.top <= enemy.bottom &&
        !enemy.death
      ) {
        console.log("player in attack area");
        return enemy;
      }
    }
    return false;
  };

  // check if npc in range to talk
  this.checkRangeTalk = function() {
    for (var npc of map.npcs) {
      if (
        this.x + this.width >= npc.left &&
        this.x < npc.right &&
        this.y + this.height >= npc.top &&
        this.y <= npc.bottom &&
        !npc.talking
      ) {
        console.log("npc in talk area");
        return npc;
      }
    }
    return false;
  };

  this.talk = function() {
    var target = this.checkRangeTalk();
    if (target != false) {
      console.log("npc found to talk to");
      target.talkTo();
    }
  };

  this.checkItem = function() {
    for (var item of map.items) {
      if (
        this.right >= item.left + item.width / 2 &&
        this.left < item.right - item.width / 2 &&
        this.bottom >= item.top + item.height / 2 &&
        this.top <= item.bottom - item.height / 2
      ) {
        console.log("item picked up");
        this.inventar.push(item);
        map.items.splice(map.items.indexOf(item), 1);
        item.inventar = true;
      }
    }
    return false;
  };
  this.useItem = function(index) {
    console.log("index ", index);
    console.log(this.inventar);
    if (this.inventar[index] !== void 0) {
      var item = this.inventar[index];
      this.inventar.splice(index, 1);
      item.use();
    } else {
      console.log("no items in inventar");
    }
  };
}
