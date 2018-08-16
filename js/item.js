function Item(x, y, type, inventar = false) {
  // Image
  this.img = new Image();
  this.img.src = "img/3/item-" + type + ".png";
  // Position
  this.width = 48;
  this.height = 48;
  this.x = x;
  this.y = y;
  this.right = this.x + this.width;
  this.left = this.x;
  this.bottom = this.y + this.height;
  this.top = this.y;
  // Animation config
  this.inventar = inventar;
  this.step = 0;
  this.avaSteps = 6;
  this.stepInterval = 8;
  this.type = type;

  this.draw = function() {
    if (this.inventar) {
      var pos = player.inventar.indexOf(this);
      ctx.drawImage(
        this.img,
        0,
        0,
        this.width,
        this.height,
        315 + 50 * pos,
        map.height - 51,
        this.width,
        this.height
      );
    } else {
      if (this.step >= this.stepInterval * this.avaSteps) {
        this.step = 0;
      }

      if (debug) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.2;
        ctx.fillRect(this.x, this.y, 48, 48);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "blue";
        ctx.globalAlpha = 0.2;
        ctx.fillRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
        ctx.restore();
      }
      ctx.drawImage(
        this.img,
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
    }
  };
}

function HealthPotion(x, y, inventar = false) {
  Item.call(this, x, y, "flask");
  this.points = 20;
  this.use = function() {
    player.health += 20;
    if (player.health > player.maxHealth) {
      player.health = player.health - (player.health - player.maxHealth);
    }
  };
}

function SuperPotion(x, y, inventar = false) {
  Item.call(this, x, y, "firepotion");
  this.use = function() {
    player.health = player.maxHealth;
  };
}

function Weapon(x, y, type, strength, inventar = false) {
  Item.call(this, x, y, type, inventar);
  this.strength = strength;
  this.use = function() {
    player.inventar.push(player.weaponItem);
    player.weaponItem = this;
    player.strength = player.basicStrength + this.strength;
  };
}

function Axe(x, y, inventar = false) {
  Weapon.call(this, x, y, "axe", 10, inventar);
}

function BlueSword(x, y, inventar = false) {
  Weapon.call(this, x, y, "bluesword", 20, inventar);
}

function GoldenSword(x, y, inventar = false) {
  Weapon.call(this, x, y, "goldensword", 30, inventar);
}

function Armor(x, y, type, defense, inventar = false) {
  Item.call(this, x, y, type, inventar);
  this.defense = defense;
  this.use = function() {
    player.inventar.push(player.armorItem);
    player.armorItem = this;
    player.body.src = "img/3/" + this.type + ".png";
  };
}

function Cloth(x, y, inventar = false) {
  Armor.call(this, x, y, "clotharmor", 10, inventar);
}

function Lether(x, y, inventar = false) {
  Armor.call(this, x, y, "leatherarmor", 20, inventar);
}

function Plate(x, y, inventar = false) {
  Armor.call(this, x, y, "platearmor", 30, inventar);
}
