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
  this.direction = 7;

  this.draw = function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
  this.drawStatusBar = function() {
    //Statusbar
    ctx.drawImage(
      this.status,
      0,
      this.height - this.status.height,
      this.width,
      this.status.height
    );
    // Healthbar
    ctx.fillStyle = "red";
    ctx.fillRect(42, this.height - 36, player.health, 25);
    ctx.drawImage(
      this.health,
      5,
      this.height - 42,
      this.health.width,
      this.health.height
    );
  };
  this.obstacles = [];

  var bigStone = {
    top: this.tileSize * 2,
    bottom: this.tileSize * 2.4,
    left: this.tileSize * 1.5,
    right: this.tileSize * 2.5,
    animation: false
  };
  this.obstacles.push(bigStone);
  var tent = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    animation: false
  };
  this.drawEnemies = function() {
    for (var enemy of this.enemies) {
      enemy.draw();
    }
  };

  this.enemies = [];
  this.enemies.push(new Enemy(300, 100, "deathknight", ctx));
  this.enemies.push(new Enemy(500, 300, "deathknight", ctx));

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
