class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.intervalId = null;
    this.framesPerSecond = 60;

    this.background = new Background(this.ctx);
    this.player = new Veneno(this.ctx, 10, this.canvas.height);
    this.boss = new Homofomaster(this.ctx, this.canvas.width, this.canvas.height);
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

    this.score = 15;
    this.tickScores = 0;
    this.endGame = false;

    this.enterBoss = false;

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

        this.ctx.restore();
        this.clearEnemy();
        this.clearBerenjenas();
        this.clearVaccines();
        this.clearCensored();

        if (!this.endGame) {
          this.checkCollisionPlayer();
          this.checkCollisionShootBerenjena();
          this.checkCollisionShootVaccine();
          this.checkCollisionShootCensored();
          this.tickEnemy++;
          this.tickEnemyShoot++;
          this.tickFlies++;
          this.tickProps++;
          this.tickScores++;
        }
        if (this.tickEnemy > this.limitEnemy) {
          if (!this.enterBoss) {
            //this.addEnemy("PUTERO");
          }
          
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
          if (!this.enterBoss) {
            this.enemies.forEach(enemy => this.enemyShoot(enemy))
          } else {
            this.bossShot();
          }
          
        }
        
        if (this.player.life <= 0 || this.endGame) {
          this.gameOver();

        }
        
        if (this.score >= 20 && !this.enterBoss) {
          this.enterBoss = true; 
        } else if (this.boss.life <= 0) {
          this.score += 100;
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
        this.score += 5;
      }
    }
    if (this.enterBoss) {
      if (this.player.collisionEnemy(this.boss)) {
        this.boss.loseLife();
        this.score += 10;
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
  checkCollisionShootCensored() {
      if (this.boss.collisionCensoredPlayer(this.player)) {
        this.player.loseLife();
      }
  }

  addEnemy(typeEnemy) {
    switch (typeEnemy) {
      case "PUTERO":
        this.enemies.push(
          new Homofobo(this.ctx, this.canvas.width, this.canvas.height)
        );
        break;
      case "BOSS":
        new Homofomaster(this.ctx, this.canvas.width, this.canvas.height)
        break;
    }
  }
 
  enemyShoot(enemy) {
    const canShoot = Math.floor(Math.random() * 10) % 5 === 0;
    if (canShoot) {
      enemy.shoot()
    }
  }

  bossShot() {
    const canShoot = Math.floor(Math.random() * 10) % 5 === 0;
    if (canShoot) {
      this.boss.shoot()
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
  clearCensored() {
    this.boss.censoredes = this.boss.censoredes.filter(
      (censored) => censored.isVisible() && !censored.impact
    );
  }

  move() {
    this.background.move();
    this.player.move();
    if (this.enterBoss){
      this.boss.move();
    }
    
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
      this.background.draw();
      this.drawScore() 
      this.player.draw();
      if (this.enterBoss) {
        this.boss.draw();
      }
      
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

  drawScore() {
    this.ctx.save();
    this.ctx.fillStyle ="white";
    this.ctx.font = "35px digital-veneno";
    this.ctx.fillText(`SCORE: ${this.score.toString().padStart(5, "0")}`, this.ctx.canvas.width - 150, 45, 100);
    this.ctx.restore();
  }

  gameOver() {
    document.getElementById("game-veneno").classList.add("hidden");
    document.getElementById("game-over").classList.remove("hidden")
    this.stop();
    setTimeout(() => {  
      this.restart();
    }, 5000)
  }

  winner() {
    document.getElementById("game-veneno").classList.add("hidden");
    document.getElementById("game-winner").classList.remove("hidden");
    this.stop();
    setTimeout(() => {   
      this.restart();
    }, 5000) 
  }

  restart() {
    location.reload();
  }
  
  cancel() {
    this.stop();
  }

}
