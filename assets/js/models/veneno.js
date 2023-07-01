class Veneno {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.y0 = y - FLOOR_POSITION;
    this.x = -5;
    this.y = y;
    this.width = 70;
    this.height = 112;
    this.vy = 0;
    this.vx = 0;
    this.ay = VENENO_AY;
    this.life = 5;

    this.animationTick = 0;
    this.berenjenas = [];
   
    this.image = new Image();
    this.image.src = "/assets/images/characters/la-veneno/movement.png";
    this.image.verticalFrames = 1; 
    this.image.verticalFrameIndex = 0;
    this.image.horizontalFrames = 4;
    this.image.horizontalFrameIndex = 0;
    this.image.onload = () => {
      this.image.isReady = true;
      this.image.frameWidth = Math.floor(this.image.width / this.image.horizontalFrames);
      this.image.frameHeight = Math.floor(this.image.height / this.image.verticalFrames);
    };  
  }

  loseLife() {
    this.life -= 1;
  }
  
  isAlive() {
    return this.life > 0;
  }

  shoot() {
    const newBerenjena = new Berenjena(this.ctx, this.x + this.width, this.y + this.height / 2);
    this.berenjenas.push(newBerenjena);  
  } 
  
  collisionEnemy(enemy) {
      return this.berenjenas.some((berenjena) => {
        const colX = berenjena.x + berenjena.width -25 >= enemy.x && berenjena.x < enemy.x + enemy.width;
        const colY = berenjena.y + berenjena.height -10 >= enemy.y && berenjena.y < enemy.y + enemy.height;

        if (colX && colY) {
          berenjena.hasImpact();
          this.berenjenas.splice(1);
        }

        return colX && colY;
      })

  }
 
  onKeyDown(event) {
    switch (event.keyCode) {
      case KEY_UP:
        this.jump();
        break;
      case KEY_DOWN:
        break;
      case KEY_LEFT:
        this.vx = -VENENO_SPEED;
        break;
      case KEY_RIGHT:
        this.vx = VENENO_SPEED;
        break;
      case KEY_SPACE:
        this.shoot();
        this.image.horizontalFrameIndex = 3;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case KEY_LEFT:
      case KEY_RIGHT:
        this.vx = 0;
        break;
    }
  }

  jump() {
    if (!this.isJumping()) {
      this.vy = -VENENO_JUMP;
    }
  }

  isJumping() {
    return this.y < this.y0;
  }

  isShooting() {
    return this.berenjenas.length > 0
  }

  move() {
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    this.berenjenas.forEach((berenjena) => {
      berenjena.move();
    });

    if (this.x + this.width > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width;
    } else if (this.x < 0) {
        this.x = 0;
    }

    if (this.y > this.y0) {
      this.y = this.y0;
      this.vy = 0;
    }
  }
 
  draw() {
    if (this.image.isReady) {
      this.ctx.drawImage(
        this.image,
        this.image.horizontalFrameIndex * this.image.frameWidth,
        this.image.verticalFrameIndex * this.image.frameHeight,
        this.image.frameWidth,
        this.image.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )};

      this.animate();
      this.berenjenas.forEach ((berenjena) => {
        berenjena.draw();
      });
      
    }
     
  animate() {
    this.animationTick++;

      if (this.isJumping()) {
        this.image.horizontalFrameIndex = 2;
      } else if (this.animationTick > VENENO_RAN_ANIMATION_TICK) {
        this.animationTick = 0; 
        this.image.horizontalFrameIndex++

        if (this.image.horizontalFrameIndex > this.image.horizontalFrames - 3) {
          this.image.horizontalFrameIndex = 0;
        }
      }
  }
}