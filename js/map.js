function Map(ctx) {
  this.width = 960;
  this.height = 700;
  this.x = 0;
  this.y = 0;
  this.tileSize = 96;
  //Images
  this.img = new Image();
  this.img.src = "img/map-small.png";
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
      this.height - this.status.height - 10,
      this.width - 10,
      this.status.height - 5
    );
    // Healthbar
    ctx.fillStyle = "red";
    ctx.fillRect(42 + 10, this.height - 36 - 10, player.health, 25);
    ctx.drawImage(
      this.health,
      5 + 10,
      this.height - 42 - 10,
      this.health.width,
      this.health.height
    );
  };
  this.obstacles = [];
  this.obstacles.push(new Fire(700, 400));
  this.obstacles.push(new Tent(700, 200));

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
  this.enemies.push(new DeathKnight(300, 100));
  this.enemies.push(new Goblin(500, 300));
  this.enemies.push(new Ogre(500, 500));
  this.enemies.push(new Spectre(600, 500));
  this.enemies.push(new Eye(750, 450));

  this.checkAttacks = function() {
    for (var enemy of this.enemies) {
      if (!enemy.fight && !enemy.death) {
        enemy.attack();
      } else if (enemy.deathStep <= 0) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        console.log("maps: enemy removed from array");
      }
    }
  };
  this.texts = [];

  this.drawTexts = function() {
    for (var text of this.texts) {
      text.draw();
    }
  };

  this.npcs = [];
  this.npcs.push(new NPC(400, 200, "villagegirl"));

  this.drawNPCs = function() {
    for (var npc of this.npcs) {
      npc.draw();
    }
  };

  this.items = [];
  this.items.push(new HealthPotion(200, 500));
  this.items.push(new SuperPotion(300, 510));
  this.items.push(new Plate(700, 510));
  this.drawItems = function() {
    var items = map.items.concat(player.inventar);
    for (var item of items) {
      item.draw();
    }
  };
}
