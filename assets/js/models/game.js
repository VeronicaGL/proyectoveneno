class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.intervalId = null;
    this.framesPerSecond = 60;

    this.background = new Background(this.ctx);
    this.backgroundGameOver = new BackgroundGameOver(this.ctx);
    this.backgroundWinner = new BackgroundWinner(this.ctx);
    this.player = new Veneno(this.ctx, 10, this.canvas.height);
    this.enemies = [];
    this.flies = [];
    this.props = [];
    this.tickEnemy = 0;
    this.tickEnemyShoot = 0;
    this.tickFlies = 0;
    this.tickProps = 0;
    this.limitEnemy = Math.floor(Math.random() * 200);
    this.limitFly = Math.floor(Math.random() * 1000);
    this.limitProp = Math.floor(Math.random() * 1000);

    this.score = 0;
    this.endGame = false;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);


    this.imageLife = new Image();
    this.imageLife.src = "/assets/images/heart.png";
  }

  onKeyDown(event) {
    this.player.onKeyDown(event);
  }

  onKeyUp(event) {
    this.player.onKeyUp(event);
  }

  start() {
    this.addEnemy("PUTERO");
    this.addFly("PALOMAGREY");
    this.addFly("PALOMABLACK");

    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.ctx.save();
        
        for (let i = 0; i < this.player.life; i++) {
          this.ctx.fillStyle = "red";
          this.ctx.drawImage(this.imageLife, 5 + 30 * i, 5, 35, 35);
        }
        
        this.ctx.font = "bold 15px verdana";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Score: ${this.score.toString().padStart(4, "0")}`, this.canvas.width - 120, 30, 150);
        this.ctx.restore();
        this.clearEnemy();
        this.clearBerenjenas();
        this.clearVaccines();
        console.log(this.endGame);
        if (!this.endGame) {
          this.checkCollisionPlayer();
          this.checkCollisionShootBerenjena();
          this.checkCollisionShootVaccine();
          this.tickEnemy++;
          this.tickEnemyShoot++;
          this.tickFlies++;
          this.tickProps++;
        }
        

        //5 110 215 320 

        if (this.tickEnemy > this.limitEnemy) {
          this.addEnemy("PUTERO");
          this.tickEnemy = 0;
          this.limitEnemy = Math.floor(Math.random() * 200);
        }

        if (this.tickFlies > this.limitFly) {
          this.addFly("PALOMAGREY");
          this.tickFlies = 0;
          this.limitFly = Math.floor(Math.random() * 1000);
        }
        if (this.tickProps > this.limitProp) {
          this.addFly("PALOMABLACK");
          this.tickProps = 0;
          this.limitProp = Math.floor(Math.random() * 1000);
        }
        if (this.tickEnemyShoot > 20) {
          this.tickEnemyShoot = 0;
          this.enemies.forEach(enemy => this.enemyShoot(enemy))
        }
        
        if (this.player.life <= 0 || this.endGame) {
          this.gameOver();
        } else if (this.player.score >= 100 || this.endGame) {
          this.winner();
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
      const colx =
        this.player.x + this.player.width >= enemy.x &&
        this.player.x < enemy.x + enemy.width;
      const coly =
        this.player.y + this.player.height >= enemy.y &&
        this.player.y < enemy.y + enemy.height;
      
      if (colx && coly) {
        this.endGame = true;
      }
    });
  }

  checkCollisionShootBerenjena() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (this.player.collisionEnemy(enemy)) {
        enemy.loseLife();
        this.score += 100;
      }
    }
  }

  checkCollisionShootVaccine() {
    this.enemies.forEach(enemy => {
      if (enemy.collisionVaccinePlayer(this.player)) {
        this.player.loseLife();
      }
    })
  }

  addEnemy(typeEnemy) {
    switch (typeEnemy) {
      case "PUTERO":
        this.enemies.push(
          new Homofobo(this.ctx, this.canvas.width, this.canvas.height)
        );
        break;
    }
  }

  enemyShoot(enemy) {
    const canShoot = Math.floor(Math.random() * 10) % 5 === 0;
    if (canShoot) {
      enemy.shoot()
    }
  }

  addFly(typeFly) {
    switch (typeFly) {
      case "PALOMAGREY":
        this.flies.push(new birdsGrey(this.ctx, this.canvas.width, this.canvas.height));
        break;

      case "PALOMABLACK":
      this.props.push(new birdsBlack(this.ctx, this.canvas.width, this.canvas.height));
      break;
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearEnemy() {
    this.enemies = this.enemies.filter(
      (enemy) => enemy.isVisible() && enemy.isAlive()
    );
  }

  clearBerenjenas() {
    this.player.berenjenas = this.player.berenjenas.filter(
      (berenjena) => berenjena.isVisible() && !berenjena.impact
    );
  }

  clearVaccines() {
    this.enemies.forEach(enemy => enemy.clearVaccines());
  }

  move() {
    this.background.move();
    this.player.move();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    this.flies.forEach((fly) => {
      fly.move();
    });
    this.props.forEach((prop) => {
      prop.move();
    });
  }

  draw() {
    if (this.player.life <= 0 || this.endGame) {
      this.backgroundGameOver.draw();
    } else {
      this.background.draw();
      this.player.draw();
      this.enemies.forEach((enemy) => {
        enemy.draw();
      });
      this.flies.forEach((fly) => {
        fly.draw();
      });
      this.props.forEach((prop) => {
        prop.draw();
      }); 
    }
    if (this.player.score >= 100) {
      this.backgroundWinner.draw();
    } else {
      this.background.draw();
      this.player.draw();
      this.enemies.forEach((enemy) => {
        enemy.draw();
      });
      this.flies.forEach((fly) => {
        fly.draw();
      });
      this.props.forEach((prop) => {
        prop.draw();
      }); 
      }
    
  }

  gameOver() {
    /*setTimeout(() => {
      this.stop();
      this.restart();
    }, 5000)*/
  }

  winner() {
    setTimeout(() => {
      this.stop();
      this.restart();
    }, 2000) 
  }

  restart() {
    location.reload();
  }
  
  cancel() {
    this.stop();
  }

} 
