function Map() {
  this.width = 1620;
  this.height = 1080;
  this.x = 0;
  this.y = 0;
  this.tileSize = 96;
  //Images
  this.img = new Image();
  this.img.src = "img/bg1.png";
  this.status = new Image();
  this.status.src = "img/3/statusbar.png";
  this.health = new Image();
  this.health.src = "img/3/healthbar.png";
  this.border = new Image();
  this.border.src = "img/3/border.png";

  this.draw = function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.border, this.x, this.y, this.width, this.height);
  };
  this.drawStatusBar = function() {
    //Statusbar
    ctx.drawImage(
      this.status,
      10,
      this.height - this.status.height - 9,
      this.width - 20,
      this.status.height - 5
    );
    // Healthbar
    ctx.fillStyle = "red";
    ctx.fillRect(42 + 9, this.height - 36 - 12, player.health, 25);
    ctx.drawImage(this.health, 5 + 8, this.height - 42 - 12, this.health.width, this.health.height);
  };
  this.obstacles = [];

  this.drawObstacles = function() {
    for (var obst of this.obstacles) {
      obst.draw();
    }
  };

  this.drawEnemies = function() {
    for (var enemy of this.enemies) {
      enemy.draw();
    }
  };

  this.enemies = [];

  this.checkAttacks = function() {
    for (var enemy of this.enemies) {
      if (!enemy.fight && !enemy.death) {
        enemy.attack();
      } else if (enemy.deathStep <= 0) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        console.log("maps: enemy removed from array");
        this.dropItem(enemy);
      }
    }
  };

  this.dropItem = function(enemy) {
    var max = 4;
    var item = "";
    var randomNum = Math.round(Math.random() * max);
    var x = enemy.right - (enemy.right - enemy.left) / 1.4;
    var y = enemy.bottom - (enemy.bottom - enemy.top) / 1.4;
    switch (enemy.type) {
      case "Skeleton":
      case "skelenton2":
      case "goblin":
        item = new HealthPotion(x, y);
        break;
      case "ogre":
        item = new Lether(x, y);
        break;
      case "deathknight":
        item = new GoldenSword(x, y);
        break;
      case "spectre":
        item = new SuperPotion(x, y);
        break;
      case "boss":
        item = new GoldenSword(x, y);
        break;
      case "eye":
        item = new BlueSword(x, y);
    }
    this.items.push(item);
  };

  this.texts = [];

  this.drawTexts = function() {
    for (var text of this.texts) {
      text.draw();
    }
  };

  this.npcs = [];

  this.drawNPCs = function() {
    for (var npc of this.npcs) {
      npc.draw();
    }
  };

  this.items = [];
  this.drawItems = function() {
    var items = map.items.concat(player.inventar);
    for (var item of items) {
      item.draw();
    }
  };

  this.checkIfGameOver = function() {
    if (player.death) {
      this.texts.push(new Text(this.width - 100, this.height - 100, "red", 40, "Game over", 10));
      player.body.src = "img/3/lavanpc.png";
      return true;
    } else {
      return false;
    }
  };

  // Fill map
  this.npcs.push(new NPC(400, 200, "villagegirl", "Hello stranger"));
  this.enemies.push(new DeathKnight(300, 100));
  this.enemies.push(new Goblin(500, 300));
  this.enemies.push(new Ogre(500, 500));
  this.enemies.push(new Spectre(600, 500));
  this.enemies.push(new Eye(750, 450));
  this.obstacles.push(new Fire(700, 400));
  this.obstacles.push(new Tent(700, 200));
}
