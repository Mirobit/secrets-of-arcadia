var debug = false;
var player;
var ctx;
var map;
var content;
var useItem, switchItem, noItem;

window.onload = function() {
  ctx = document.getElementById("gamemap").getContext("2d");
  var themeSong = document.getElementById("themesong");
  var hit1 = document.getElementById("hit1");
  var hit2 = document.getElementById("hit2");
  hit2.volume = 1;
  var npc = document.getElementById("npc");
  useItem = document.getElementById("useItem");
  switchItem = document.getElementById("switch");
  noItem = document.getElementById("noitem");
  var kill = document.getElementById("kill");
  kill.volume = 1;
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").classList.add("hide");
    document.getElementById("instructions").classList.add("hide");
    themeSong.loop = true;
    //themeSong.play();
    ctx.clearRect(0, 0, 960, 700);
    player = new Player(70, 60);

    map = new Map();
    content = new Content();
    player.move(8); // Player is otherwise invsivle before first move
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
    map.drawObjects();
    map.drawNPCs();
    map.drawStatusBar();
    map.drawItems();
    map.checkIfGameOver();
    map.drawTexts();

    window.requestAnimationFrame(drawCanvas);
  }
};
