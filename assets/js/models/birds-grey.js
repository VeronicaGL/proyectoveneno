class birdsGrey {
    constructor(ctx, x, y) {
      this.ctx = ctx
      this.x = this.ctx.canvas.width;
      this.y = 60;
      this.width = 50;
      this.height = 30;
      this.vx = -4;
     
      this.animationTick = 0;
  
      this.image = new Image();
      this.image.src = "/assets/images/characters/props/paloma-grey.png";
      this.image.verticalFrames = 1;
      this.image.verticalFrameIndex = 0;
      this.image.horizontalFrames = 3;
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
  
   animate() {
    this.animationTick++;
  
    if (this.animationTick > 15) {
      this.animationTick = 0; 
      this.image.horizontalFrameIndex++
  
      if (this.image.horizontalFrameIndex > this.image.horizontalFrames - 1) {
        this.image.horizontalFrameIndex = 0;
        }
      }
    }
    
  }