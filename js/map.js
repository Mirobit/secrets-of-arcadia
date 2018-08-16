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
  // Quests
  this.goblinQuestB = false;

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
      case "bat":
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

  // Quests/Events
  this.goblinQuest = function() {
    if (this.goblinQuestB) {
      return;
    } else {
      if (player.x >= 260) {
        this.goblinQuestB = true;
        var goblin = new Goblin(370, 245);
        this.enemies.push(goblin);
        goblin.talkTo("Stop! Give me your gold!", 3);
      } else {
        return;
      }
    }
  };

  // Fill map

  // this.enemies.push(new DeathKnight(300, 100));
  // this.enemies.push(new Goblin(500, 300));
  // this.enemies.push(new Ogre(500, 500));
  // this.enemies.push(new Spectre(600, 500));
  // this.enemies.push(new Eye(750, 450));

  // camp
  this.obstacles.push(new Tent(this.width - 130, 20));
  this.obstacles.push(new Tent(this.width - 245, 20));
  this.obstacles.push(new Tent(this.width - 135, 320));
  this.obstacles.push(new Tent(this.width - 265, 320));
  this.obstacles.push(new Fire(this.width - 320, 120));
  this.npcs.push(new NPC(this.width - 450, 20, "guard", "The road is closed!"));
  this.npcs.push(
    new NPC(
      this.width - 420,
      130,
      "king",
      "The dark mage and his henchmans took all our coders. We need to get them back!",
      96,
      96
    )
  );
  //Forrest
  //this.enemies.push(new Bat(575, 150));
  this.obstacles.push(new Tree(100, 200));
  this.obstacles.push(new Tree(310, -10));
  this.obstacles.push(new Tree(0, 180));
  this.obstacles.push(new Tree(200, 270));
  this.obstacles.push(new Tree(310, 310));
  this.obstacles.push(new Tree(420, 300));
  this.obstacles.push(new Tree(520, 270));
  var villagegirl = new NPC(750, 180, "villagegirl", "We are ruined! They took all our coders!");
  villagegirl.talkTo("Help!", 4);
  this.npcs.push(villagegirl);

  // Cave
  this.obstacles.push(new LavaFall(this.width - 77, this.height - 318));
  this.obstacles.push(new LavaLanding(this.width - 77, this.height - 180));
  this.obstacles.push(new LavaBubble1(this.width - 250, this.height - 400));
  this.obstacles.push(new LavaBubble2(this.width - 100, this.height - 380));
  this.obstacles.push(new Torch(this.width - 223, this.height - 265));
  this.obstacles.push(new Torch(this.width - 150, this.height - 265));
}
