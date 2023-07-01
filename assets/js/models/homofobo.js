class Homofobo {
    constructor(ctx, x, y) {
      this.ctx = ctx
      this.x = x;
      this.y = y -FLOOR_POSITION;
      this.width = 69;
      this.height = 112;
      this.vx = -3;
      this.life = 1;
     
      this.animationTick = 0;
  
      this.image = new Image();
      this.image.src = "/assets/images/characters/homofobo/movement.png";
      this.image.verticalFrames = 1;
      this.image.verticalFrameIndex = 0;
      this.image.horizontalFrames = 2;
      this.image.horizontalFrameIndex = 0;
      this.image.onload = () => {
        this.image.isReady = true;
        this.image.frameWidth = Math.floor(this.image.width / this.image.horizontalFrames);
        this.image.frameHeight = Math.floor(this.image.height / this.image.verticalFrames);
      };  
    }
  
    move() {
      this.x += this.vx;
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
        );
        this.animate();
      }
    }

    loseLife() {
      this.life -= 1;
    }

    isAlive() {
      return this.life > 0;
    }
  
   animate() {
    this.animationTick++;
  
    if (this.animationTick > 30) {
      this.animationTick = 3; 
      this.image.horizontalFrameIndex++
  
      if (this.image.horizontalFrameIndex > this.image.horizontalFrames - 1) {
        this.image.horizontalFrameIndex = 0;
        }
      }
    }

    isVisible() {
      return this.x + this.width > 0;
    }
  }