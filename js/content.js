function Content() {
  // Quests
  this.goblinQuestB = false;
  this.helpEventB = false;
  this.finalFightB = false;
  this.rescue = false;

  // Quests/Events
  this.goblinQuest = function() {
    if (this.goblinQuestB) {
      return;
    } else {
      if (player.x >= 240) {
        this.goblinQuestB = true;
        var goblin = new Goblin(370, 245, 11);
        map.enemies.push(goblin);
        goblin.talkTo("Stop! Give me your gold!", 2);
      } else {
        return;
      }
    }
  };
  this.helpEvent = function() {
    if (this.helpEventB) {
      return;
    } else {
      if (player.x >= 550) {
        this.helpEventB = true;
        var villagegirl = map.npcs.find(function(npc) {
          return npc.type === "villagegirl";
        });
        villagegirl.talkTo("Help!", 1);
      } else {
        return;
      }
    }
  };

  this.finalFight = function() {
    if (this.finalFightB) {
      return;
    }
    var deathknight = map.enemies.find(function(enemy) {
      return enemy.type === "deathknight";
    });
    if (deathknight !== undefined) {
      return;
    }
    this.finalFightB = true;
    this.rescueB = true;
    setTimeout(
      function() {
        var spectre = new Spectre(1400, 910);
        spectre.talkTo("Uh! Someone thinks he is skilled! ", 3);
        map.enemies.push(spectre);
        this.rescueB = false;
      }.bind(this),
      2500
    );
  };

  this.rescue = function() {
    if (this.rescueB || !this.finalFightB) {
      return;
    }
    var spectre = map.enemies.find(function(enemy) {
      return enemy.type === "spectre";
    });
    if (spectre != undefined) {
      return;
    }
    this.rescueB = true;
    setTimeout(function() {
      var coder = new NPC(1470, 900, "coder", "I don't know how to thank you. I can do your CSS!");
      var beachnpc = new NPC(1300, 880, "beachnpc", "Where is the sun?");
      beachnpc.talkTo("Huray! We are free!", 2);
      map.npcs.push(coder);
      map.npcs.push(new NPC(1440, 870, "forestnpc", "Puh! That was last minute"));
      map.npcs.push(beachnpc);
      map.npcs.push(new NPC(1350, 890, "villagegirl", "Thank you! You saved the Bootcamp!"));
    }, 2000);
  };

  // Fill map

  // Put Obstacles
  map.obstacles.push(new Obstacle(0, 0, 570, 100));
  map.obstacles.push(new Obstacle(700, 0, 150, 100));
  map.obstacles.push(new Obstacle(660, 300, 220, 170));
  map.obstacles.push(new Obstacle(735, 550, 60, 370));
  map.obstacles.push(new Obstacle(1260, 590, 360, 280));
  // camp
  map.objects.push(new Tent(map.width - 130, 25));
  map.objects.push(new Tent(map.width - 245, 20));
  map.objects.push(new Tent(map.width - 135, 320));
  map.objects.push(new Tent(map.width - 265, 300));
  map.objects.push(new Fire(map.width - 320, 120));
  map.objects.push(new Fire(map.width - 340, 360));
  map.npcs.push(new NPC(map.width - 450, 20, "guard", "The road is closed!"));
  map.npcs.push(
    new NPC(
      map.width - 100,
      220,
      "guard",
      "Our JQuery had no chance against the canvas black magic"
    )
  );
  map.npcs.push(
    new NPC(map.width - 350, 300, "priest", "I couldn't stop them. My code wasn't powerful enough!")
  );
  map.npcs.push(
    new NPC(
      map.width - 420,
      130,
      "king",
      "The dark mage took all our coders. We need to get them back!",
      96,
      96
    )
  );
  //Forrest
  //map.enemies.push(new Bat(575, 150));
  map.objects.push(new Tree(100, 200));
  map.objects.push(new Tree(310, -10));
  map.objects.push(new Tree(0, 180));
  map.objects.push(new Tree(200, 270));
  map.objects.push(new Tree(310, 310));
  map.objects.push(new Tree(420, 300));
  map.objects.push(new Tree(520, 270));
  map.objects.push(new Tree(200, 270));
  map.objects.push(new Tree(210, 340));
  map.objects.push(new Tree(50, 280));
  map.objects.push(new Tree(0, 400));
  map.objects.push(new Tree(140, 400));
  map.enemies.push(new Ogre(580, 10));
  map.npcs.push(new NPC(850, 210, "villagegirl", "We are ruined! They took all our coders!"));

  // Scary Forrest
  map.objects.push(new Tree(560, 600));
  map.objects.push(new Tree(480, 650));
  map.objects.push(new Tree(380, 620));

  map.enemies.push(new Skeleton(550, 460, 2));
  map.enemies.push(new Skeleton(400, 490, 2));

  map.enemies.push(new Skeleton(120, 700, 5));
  map.enemies.push(new Skeleton(290, 750));
  map.enemies.push(new SkeletonArmor(580, 8350));

  map.objects.push(new Tree(-20, 530));
  map.objects.push(new Tree(-25, 610));
  map.objects.push(new Tree(-55, 780));
  // Cave
  map.objects.push(new Torch(map.width - 258, map.height - 264));
  map.objects.push(new Torch(map.width - 116, map.height - 264));
  map.objects.push(new LavaFall(map.width - 77, map.height - 318));
  map.objects.push(new LavaLanding(map.width - 77, map.height - 180));
  map.objects.push(new LavaBubble1(map.width - 270, map.height - 390));
  map.objects.push(new LavaBubble2(map.width - 100, map.height - 380));
  map.objects.push(new LavaBubble2(map.width - 230, map.height - 470));

  map.objects.push(new Tree(840, 540));
  map.objects.push(new Tree(1010, 530));
  map.objects.push(new Tree(740, 630));
  map.objects.push(new Tree(1100, 430));
  map.objects.push(new DeathTree2(1100, 550));
  map.objects.push(new DeathTree1(1000, 640));
  map.objects.push(new DeathTree1(900, 630));
  map.objects.push(new DeathTree2(1100, 660));
  map.objects.push(new DeathTree2(850, 690));

  map.enemies.push(new DeathKnight(1200, 870));

  map.objects.push(new DeathTree2(820, 880));
  map.objects.push(new DeathTree1(990, 830));
  map.objects.push(new DeathTree2(900, 840));
}
