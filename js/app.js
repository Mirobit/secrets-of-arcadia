var debug = false;
var player;
var ctx;
var map;

window.onload = function() {
  ctx = document.getElementById("gamemap").getContext("2d");

  document.getElementById("start-button").onclick = function() {
    ctx.clearRect(0, 0, 960, 700);
    player = new Player(0, 0, ctx);
    map = new Map(ctx);
    console.log("Start InvertvalID: ");
    drawCanvas();

    document.onkeydown = function(e) {
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
    map.checkAttacks();
    map.draw();
    map.drawStatusBar();
    map.drawEnemies();
    map.drawItems();
    map.drawObstacles();
    player.draw();
    map.drawNPCs();
    map.drawTexts();
    window.requestAnimationFrame(drawCanvas);
  }
};
