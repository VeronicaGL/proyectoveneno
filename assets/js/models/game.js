class Game {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
  
      this.intervalId = null;
      this.framesPerSecond = 60;
  
      this.background = new Background(this.ctx);
      this.player = new Veneno(this.ctx, 10, this.canvas.height);
      this.berenjenas = [];
      this.enemies = [];
      this.fumes = [];
      this.flies= new birdsGrey(this.ctx, 10, this.canvas.height);
      this.props = new birdsBlack(this.ctx, 10, this.canvas.height);
      this.tickEnemy = 0;
      this.limitEnemy =  Math.floor(Math.random() * 100);
    }
  
    onKeyDown(event) {
      this.player.onKeyDown(event);
    }
  
    onKeyUp(event) {
      this.player.onKeyUp(event);
    }
  
    start() {
      this.addEnemy("PUTERO");
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          this.clear();
          this.move();
          this.draw();
          this.clearEnemy();
          this.clearBerenjenas();
          this.checkCollisionPlayer();
          this.checkCollisionShoot();
          this.tickEnemy++;
          if (this.tickEnemy % 80 == 0) {

            this.addEnemy("PUTERO");
           
          }
        }, 1000 / this.framesPerSecond);
        }
      }
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    checkCollisionPlayer() {
      this.enemies.forEach((enemy) => {
        const colx = this.player.x + this.player.width -40 >= enemy.x && this.player.x < enemy.x + enemy.width;
        const coly = this.player.y + this.player.height -50 >= enemy.y && this.player.y < enemy.y + enemy.height;
            
        if (colx && coly) {
          this.gameOver();
          this.enemies.splice(1);
          const newFume = new Fumes(this.ctx, enemy.x + enemy.width, enemy.y + enemy.height / 2);
          newFume.draw();
        }
      });
    } 

    checkCollisionShoot() {
      this.enemies.forEach((enemy) => { 
        if (this.player.collisionEnemy(enemy)) {
            enemy.loseLife();         
        }
      });
    } 

    addEnemy (typeEnemy) {
      switch(typeEnemy) {
        case "PUTERO":
          this.enemies.push(new Homofobo(this.ctx, this.canvas.width, this.canvas.height));
        break;
       }
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearEnemy() {
      this.enemies = this.enemies.filter(enemy => enemy.isVisible() && enemy.isAlive());
    }

    clearBerenjenas() {
      this.player.berenjenas = this.player.berenjenas.filter(berenjena => !berenjena.hmpact);
    }
  
    move() {
      this.background.move();
      this.player.move();
      this.enemies.forEach((enemy) => enemy.move());
      this.props.move();
      this.flies.move();
    }
  
    draw() {
      this.background.draw();
      this.player.draw();
      this.enemies.forEach((enemy) => enemy.draw());
      this.props.draw();
      this.flies.draw();
    }

    restart() {
      this.clear();
      this.enemies = [];
      this.flies= new birdsGrey(this.ctx, 10, this.canvas.height);
      this.props = new birdsBlack(this.ctx, 10, this.canvas.height);
      this.player = new Veneno(this.ctx, 10, this.canvas.height);
      this.tickEnemy = 0;
      this.limitEnemy = Math.floor(Math.random() * 100);
      this.start();
    }

    gameOver() {
      this.stop();
      
      if (confirm("GAME OVER. ¿Quieres volver a jugar?")) {
        this.restart();
      } else {
        this.clear();
      }
    }
  }
    
