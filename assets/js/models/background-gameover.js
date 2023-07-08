class BackgroundGameOver {

    constructor (ctx) {
      this.ctx = ctx;
      this.x = 0;
      this.y = 0;
      this.width = this.ctx.canvas.width;
      this.height = this.ctx.canvas.height;

      this.sprite = new Image();
      this.sprite.src = "/assets/images/gameover.gif";
      this. sprite.onload = () => {
        this.sprite.isReady = true;
      }
    }

    draw() {
        if (this.sprite.isReady) {
          this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      }
    }
}