class Homofomaster {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y - FLOOR_POSITION;
      this.width = 150;
      this.height = 130;
      this.vx = -1;
      this.life = 10;
      
      this.censoredes = [];
      this.animationTick = 0;

      this.image = new Image();
      this.image.src = "/assets/images/characters/homofomaster/homofomaster.png";
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
      const newCensored = new Censored(this.ctx, this.x + this.width, this.y + this.height / 2);
      this.censoredes.push(newCensored);  
    } 
    
    collisionCensoredPlayer(player) {
        return this.censoredes.some((censored) => {
          const colX = censored.x + censored.width - 25 >= player.x && censored.x < player.x + player.width;
          const colY = censored.y + censored.height - 10 >= player.y && censored.y < player.y + player.height;
    
          if (colX && colY) {
            censored.hasImpact();
          }
          return colX && colY;
        })
    
    }

    isShooting() {
        return this.censoredes.length > 0
    }

    clearCensored() {
        this.censoredes = this.censored.filter(censored => censored.isVisible() && !censored.impact)
    }
     
    move() {
      if (this.x > this.ctx.canvas.width / 2){
        this.x += this.vx;
      }
    
      this.censoredes.forEach((censored) => {
        censored.move();
      });

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
        }
    
        this.animate();
        this.censoredes.forEach((censored) => {
          censored.draw();
        });
      }
       
    animate() {
        this.animationTick++;
    
        if (this.isShooting()) {
            this.image.horizontalFrameIndex = 1;
          } else if (this.animationTick > VENENO_RAN_ANIMATION_TICK) {
            this.animationTick = 0; 
            this.image.horizontalFrameIndex++
        }
        this.censoredes.forEach((censored) => {
            censored.move();
          });

        if (this.image.horizontalFrameIndex > this.image.horizontalFrames - 3) {
            this.image.horizontalFrameIndex = 0;
        }
    }

    isVisible() {
        return this.x + this.width > 0;
      }
}