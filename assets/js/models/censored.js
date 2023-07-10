class Censored {
    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x -2;
        this.y = y -30;
        this.width = 100;
        this.height = 80;
        this.vx = -1;
        this.vy = 0; 
        this.ax = 0;
        this.ay = 0
        this.impact = false;
        this.image = new Image();
        this.image.src = "/assets/images/characters/weapons/censored.png";
        this.image.verticalFrames = 1;
        this.image.verticalFrameIndex = 0;
        this.image.horizontalFrames = 4;  
        this.image.horizontalFrameIndex = 0;
        this.image.onload = () => {
            this.image.isReady = true;
            this.image.frameWidth = Math.floor(this.image.width / this.image.horizontalFrames);
            this.image.frameHeight = Math.floor(this.image.height / this.image.verticalFrames);
        }
        
        this.animationTick = 0;
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
              this.height,
            )};
            this.animate();
    } 
    
    hasImpact() {
      this.impact = true; 
    }
    
    move() { 
        this.vx += this.ax;
        this.x += this.vx; 
    }

    animate() {
        this.animationTick++;
      
        if (this.animationTick > 4) {
          this.animationTick = 0; 
          this.image.horizontalFrameIndex++
      
          if (this.image.horizontalFrameIndex > this.image.horizontalFrames - 1) {
            this.image.horizontalFrameIndex = 0;
            }
          }
        }

    isVisible() {   
      const isTrue = this.x + this.width > 0;
       return isTrue
    }       


}
    