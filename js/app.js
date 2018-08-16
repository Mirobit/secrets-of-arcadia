var debug = false;
var player;
var ctx;
var map;
var content;
var useSound;

window.onload = function() {
  ctx = document.getElementById("gamemap").getContext("2d");
  var themeSong = document.getElementById("themesong");
  var hit1 = document.getElementById("hit1");
  var hit2 = document.getElementById("hit2");
  hit2.volume = 0.5;
  var npc = document.getElementById("npc");
  useSound = document.getElementById("useItem");
  console.log(useSound);

  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").classList.add("hide");
    document.getElementById("instructions").classList.add("hide");
    themeSong.loop = true;
    //themeSong.play();
    ctx.clearRect(0, 0, 960, 700);
    player = new Player(800, 850);
    map = new Map();
    content = new Content();
    console.log("Start InvertvalID: ");
    drawCanvas();

    document.onkeydown = function(e) {
      if (player.death) {
        return;
      }
      switch (e.keyCode) {
        case 38:
          player.move(4);
          break;
        case 40:
          player.move(7);
          break;
        case 37:
          player.move(10);
          break;
        case 39:
          player.move(1);
          break;
        case 17: //control
          if (!player.fight) {
            player.attack(map.enemies);
          }
          break;
        case 16: // shift
          player.talk();
          break;
        case 49: // 1
        case 50: // 2
        case 51: // 3
        case 52: // 4
        case 53: // 5
        case 54: // 6
        case 55: // 7
          player.useItem(e.key - 1);
          break;
        // case 18:
        //   if (!enemy.fight) {
        //     enemy.attack();
        //   }
        //   break;
        case 66:
          console.log("Stoppping IntervalID: ", interval);
          stop();
          break;
      }
    };
  };

  function drawCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!player.death) {
      map.checkAttacks();
    }

    map.draw();
    content.goblinQuest();
    content.helpEvent();
    content.finalFight();
    content.rescue();
    map.drawEnemies();

    player.draw();
    map.drawObstacles();
    map.drawNPCs();
    map.drawStatusBar();
    map.drawItems();
    map.checkIfGameOver();
    map.drawTexts();

    window.requestAnimationFrame(drawCanvas);
  }
};
