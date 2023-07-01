class Background {

    constructor (ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.sprite = new Image();
        this.sprite.src = "../assets/images/background-forest.png";
        this. sprite.onload = () => {
          this.sprite.isReady = true;
        }
    }

    move() {
        this.x += BACKGROUND_SPEED;
    
        if (this.x < -this.width) {
          this.x = 0;
        }
      }
    
    draw() {
        if (this.sprite.isReady) {
          this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
          this.ctx.drawImage(this.sprite, this.x + this.width, this.y, this.width, this.height);
        }
      }
}