class Fumes{
    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y - 40;
        this.width = 60;
        this.height = 60;
        this.vx = 0;
        this.vy = 0; 
        this.ax = 0;
        this.ay = 0;
        this.impact = false;
        this.image = new Image();
        this.image.src = "/assets/images/characters/weapons/fumemove.png";
        this.image.verticalFrames = 1;
        this.image.verticalFrameIndex = 0;
        this.image.horizontalFrames = 2;  
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
              this.height
            )};
            this.animate();
    } 
    move() { 
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;   
    }

    animate() {
        this.animationTick++;
      
        if (this.animationTick > 2) {
          this.animationTick = 0; 
          this.image.horizontalFrameIndex++
      
          if (this.image.horizontalFrameIndex > this.image.horizontalFrames - 1) {
            this.image.horizontalFrameIndex = 0;
            }
          }
          if (this.impact){
            
          }
        }


}    